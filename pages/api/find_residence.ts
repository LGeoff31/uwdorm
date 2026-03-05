import type { NextApiRequest, NextApiResponse } from 'next';
import { pipeline } from '@xenova/transformers';
import { RESIDENCE_DATA, Residence, ResidenceResult } from '../../utils/residenceData';

// --------------------------------------------------------------------------
// Module-level cache: embeddings and pipeline persist across hot requests
// --------------------------------------------------------------------------
let embeddingPipe: any = null;
let cachedResidenceEmbeddings: number[][] | null = null;

/** Build the text document used to embed each residence */
function buildResidenceDocument(r: (typeof RESIDENCE_DATA)[number]): string {
  return [
    r.name,
    r.short_description,
    r.detailed_description,
    r.unique_features.join('. '),
    `Pros: ${r.pros.join(', ')}`,
    `Cons: ${r.cons.join(', ')}`,
    `Best for: ${r.best_for}`,
    `Amenities: ${r.amenities.join(', ')}`,
    `Meal plan: ${r.meal_plan}`,
    `Style: ${r.style}`,
  ]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// --------------------------------------------------------------------------
// Embedding helpers
// --------------------------------------------------------------------------
async function getPipeline() {
  if (!embeddingPipe) {
    embeddingPipe = await pipeline('feature-extraction', 'Supabase/gte-small');
  }
  return embeddingPipe;
}

async function embed(pipe: any, text: string): Promise<number[]> {
  const output = await pipe(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data) as number[];
}

/** Lazily computes and caches all residence embeddings */
async function getResidenceEmbeddings(pipe: any): Promise<number[][]> {
  if (cachedResidenceEmbeddings) return cachedResidenceEmbeddings;
  console.log('[find_residence] Computing residence embeddings (one-time)…');
  const embeddings = await Promise.all(
    RESIDENCE_DATA.map((r) => embed(pipe, buildResidenceDocument(r)))
  );
  cachedResidenceEmbeddings = embeddings;
  return embeddings;
}

// --------------------------------------------------------------------------
// Structured scoring
// Maps the user's explicit form choices to a 0–1 score per residence.
// This is far more reliable than embeddings alone for a 6-item dataset.
//
// Room type → style weights:
//   Traditional Dormitory  → traditional residences
//   Suite-Style            → suite residences
//   Apartment-Style        → suite residences (UWP is most apt)
//   Specialty Housing      → college residences
//
// Meal plan → meal plan match:
//   Yes → mandatory meal plans
//   No  → optional meal plans
// --------------------------------------------------------------------------
const STYLE_WEIGHTS: Record<string, Record<string, number>> = {
  'Traditional Dormitory': { traditional: 1.0, suite: 0.1, college: 0.4 },
  'Suite-Style':           { traditional: 0.1, suite: 1.0, college: 0.3 },
  'Apartment-Style':       { traditional: 0.1, suite: 0.9, college: 0.3 },
  'Specialty Housing':     { traditional: 0.2, suite: 0.2, college: 1.0 },
};

function structuredScore(
  r: (typeof RESIDENCE_DATA)[number],
  room: string,
  mealplan: string
): number {
  // Style score (0–1)
  const styleWeights = STYLE_WEIGHTS[room] ?? { traditional: 0.33, suite: 0.33, college: 0.33 };
  const styleScore = styleWeights[r.style] ?? 0.2;

  // Meal plan score (0–1)
  const wantsMealPlan = mealplan === 'Yes';
  const hasMandatory = r.meal_plan.toLowerCase().includes('mandatory');
  const mealScore = wantsMealPlan === hasMandatory ? 1.0 : 0.0;

  // Weighted blend: style is slightly more discriminating
  return styleScore * 0.55 + mealScore * 0.45;
}
// --------------------------------------------------------------------------
// Cosine similarity (pure JS – fast enough for 6 items)
// --------------------------------------------------------------------------
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

// --------------------------------------------------------------------------
// Maximal Marginal Relevance (MMR) with hybrid scoring + style-group penalty.
//
// Uses pre-computed hybridScores (55% structured + 45% semantic) as the
// relevance signal instead of raw cosine similarity to the query.  This
// ensures form selections (room type, meal plan) strongly influence ranking
// while pure embedding noise is suppressed.
//
// Style penalty (+0.25) keeps the three picked residences from the same bucket
// (traditional / suite / college).
//
//   lambda = 0.4  → slightly diversity-biased
// --------------------------------------------------------------------------
function mmrHybrid(
  candidateIndices: number[],  // pre-sorted by hybridScore descending
  embeddings: number[][],
  hybridScores: number[],      // pre-computed per-residence hybrid score
  styles: string[],
  lambda: number,
  k: number
): number[] {
  const STYLE_PENALTY = 0.25;
  const selected: number[] = [];
  const candidates = [...candidateIndices];

  while (selected.length < k && candidates.length > 0) {
    let bestScore = -Infinity;
    let bestIdx = -1;
    let bestCandPos = -1;

    for (let ci = 0; ci < candidates.length; ci++) {
      const idx = candidates[ci];
      const relevance = hybridScores[idx]; // pre-computed hybrid score

      // Max embedding-similarity to already-selected items + style penalty
      let maxSim = 0;
      for (const selIdx of selected) {
        let sim = cosineSimilarity(embeddings[idx], embeddings[selIdx]);
        if (styles[idx] === styles[selIdx]) sim = Math.min(1, sim + STYLE_PENALTY);
        if (sim > maxSim) maxSim = sim;
      }
      const diversity = 1 - maxSim;

      const score = lambda * relevance + (1 - lambda) * diversity;
      if (score > bestScore) {
        bestScore = score;
        bestIdx = idx;
        bestCandPos = ci;
      }
    }

    selected.push(bestIdx);
    candidates.splice(bestCandPos, 1);
  }

  return selected;
}

// --------------------------------------------------------------------------
// "Why chosen" — keyword-match user input against residence pros/features
// --------------------------------------------------------------------------
function generateWhyChosen(inputText: string, r: Residence): string {
  const lower = inputText.toLowerCase();

  // [keywords to look for in input] → [terms to look for in a pro/feature]
  const rules: [string[], string[]][] = [
    [['social', 'friend', 'meet people', 'community', 'outgoing', 'party'],  ['friend', 'social', 'community', 'atmosphere', 'energy']],
    [['quiet', 'study', 'focus', 'peace', 'calm', 'concentrate'],            ['quiet', 'independen', 'mature', 'private', 'study']],
    [['cook', 'kitchen', 'meal', 'food', 'groceries', 'eat', 'diet'],        ['cook', 'kitchen', 'meal', 'food', 'diet', 'grocery']],
    [['privacy', 'private', 'alone', 'own room', 'single', 'lockable'],      ['privacy', 'private', 'own', 'lockable', 'single']],
    [['air condition', ' ac ', 'cool', 'hot summer', 'heat'],                 ['air condition', 'ac']],
    [['modern', 'new', 'renovate', 'updated', 'newest'],                      ['modern', 'newest', 'renovated', 'light']],
    [['close', 'near campus', 'walk', 'location', 'proximity', 'commute'],   ['location', 'campus', 'close', 'walk', 'minute']],
    [['sustainab', 'environment', 'green', 'local food', 'organic'],         ['sustainab', 'local', 'environment', 'green']],
    [['gym', 'fitness', 'exercise', 'workout', 'sport'],                      ['gym', 'fitness', 'exercise']],
    [['cheap', 'affordable', 'budget', 'save money', 'cost'],                 ['save', 'budget', 'money', 'afford', 'optional']],
    [['independence', 'independent', 'freedom', 'flexible'],                  ['independen', 'freedom', 'flexible', 'mature']],
    [['inclusive', 'gender', 'diversity', 'accessibility'],                   ['inclusive', 'gender', 'accessib', 'all-gender']],
    [['fresh food', 'local', 'dining', 'cafeteria', 'meal plan'],             ['dining', 'food', 'meal plan', 'bistro', 'eatery', 'cafeteria']],
  ];

  const matched: string[] = [];

  for (const [inputKws, proKws] of rules) {
    if (!inputKws.some((kw) => lower.includes(kw))) continue;
    // search pros first, then unique_features, then best_for
    const candidates = [...r.pros, ...r.unique_features, r.best_for];
    const hit = candidates.find((c) =>
      proKws.some((pk) => c.toLowerCase().includes(pk))
    );
    if (hit && !matched.includes(hit)) matched.push(hit);
    if (matched.length >= 3) break;
  }

  // Fallback: top 2 pros if nothing keyword-matched
  if (matched.length === 0) matched.push(...r.pros.slice(0, 2));

  return matched.slice(0, 3).join(' · ');
}

// --------------------------------------------------------------------------
// API route
// --------------------------------------------------------------------------
export default async function find_residence(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { inputText, room, mealplan } = req.body;
  if (!inputText) {
    return res.status(400).json({ error: 'inputText is required' });
  }

  try {
    const pipe = await getPipeline();

    // Compute query embedding + all residence embeddings in parallel
    const [queryEmbedding, allEmbeddings] = await Promise.all([
      embed(pipe, inputText),
      getResidenceEmbeddings(pipe),
    ]);

    const allIndices = RESIDENCE_DATA.map((_, i) => i);
    const styles = RESIDENCE_DATA.map((r) => r.style);

    // Hybrid score: blend structured intent (room type + meal plan) with
    // semantic similarity.  Structured is the dominant signal because with
    // only 6 semantically-similar housing options embeddings alone are noisy.
    const hybridScores = allIndices.map((idx) => {
      const semantic = cosineSimilarity(queryEmbedding, allEmbeddings[idx]);
      const structured = structuredScore(RESIDENCE_DATA[idx], room ?? '', mealplan ?? '');
      // 55 % structured + 45 % semantic
      return structured * 0.55 + semantic * 0.45;
    });

    // Sort candidates by hybrid score descending before MMR
    const sortedIndices = [...allIndices].sort(
      (a, b) => hybridScores[b] - hybridScores[a]
    );

    // MMR: lambda=0.4 → diversity-biased + style-group penalty
    // Pass hybridScores as the relevance signal instead of raw cosine
    const diverseIndices = mmrHybrid(
      sortedIndices,
      allEmbeddings,
      hybridScores,
      styles,
      0.4,
      3
    );

    const results: ResidenceResult[] = diverseIndices.map((idx) => {
      const r = RESIDENCE_DATA[idx];
      return {
        id: r.id,
        name: r.name,
        shortDescription: r.short_description,
        relevanceScore: hybridScores[idx],
        matchPercentage: Math.round(
          Math.min(hybridScores[idx] * 115, 99) // scale for readability
        ),
        style: r.style,
        priceRange: r.price_range ?? 'Contact for pricing',
        bestFor: r.best_for,
        pros: r.pros,
        cons: r.cons,
        mealPlan: r.meal_plan,
        amenities: r.amenities,
        whyChosen: generateWhyChosen(inputText, r),
      };
    });

    return res.status(200).json({ results });
  } catch (error) {
    console.error('[find_residence] Error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
