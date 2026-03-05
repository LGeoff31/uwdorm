import type { NextApiRequest, NextApiResponse } from 'next';
import { vectorIndex } from '../../utils/upstash';
import {
  RESIDENCE_DATA,
  Residence,
  ResidenceResult,
} from '../../utils/residenceData';

// --------------------------------------------------------------------------
// Structured scoring
// Maps the user's explicit form choices to a 0–1 score per residence.
// --------------------------------------------------------------------------
const STYLE_WEIGHTS: Record<string, Record<string, number>> = {
  'Traditional Dormitory': { traditional: 1.0, suite: 0.1, college: 0.4 },
  'Suite-Style': { traditional: 0.1, suite: 1.0, college: 0.3 },
  'Apartment-Style': { traditional: 0.1, suite: 0.9, college: 0.3 },
  'Specialty Housing': { traditional: 0.2, suite: 0.2, college: 1.0 },
};

function structuredScore(
  r: Residence,
  room: string,
  mealplan: string
): number {
  const styleWeights =
    STYLE_WEIGHTS[room] ?? { traditional: 0.33, suite: 0.33, college: 0.33 };
  const styleScore = styleWeights[r.style] ?? 0.2;

  const wantsMealPlan = mealplan === 'Yes';
  const hasMandatory = r.meal_plan.toLowerCase().includes('mandatory');
  const mealScore = wantsMealPlan === hasMandatory ? 1.0 : 0.0;

  return styleScore * 0.55 + mealScore * 0.45;
}

// --------------------------------------------------------------------------
// Cosine similarity (for MMR pairwise diversity computation)
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
// MMR with hybrid scoring + style-group penalty
// --------------------------------------------------------------------------
function mmrHybrid(
  candidateIndices: number[],
  embeddings: Map<number, number[]>,
  hybridScores: Map<number, number>,
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
      const relevance = hybridScores.get(idx) ?? 0;

      let maxSim = 0;
      for (const selIdx of selected) {
        const eA = embeddings.get(idx);
        const eB = embeddings.get(selIdx);
        if (eA && eB) {
          let sim = cosineSimilarity(eA, eB);
          if (styles[idx] === styles[selIdx])
            sim = Math.min(1, sim + STYLE_PENALTY);
          if (sim > maxSim) maxSim = sim;
        }
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

  const rules: [string[], string[]][] = [
    [
      ['social', 'friend', 'meet people', 'community', 'outgoing', 'party'],
      ['friend', 'social', 'community', 'atmosphere', 'energy'],
    ],
    [
      ['quiet', 'study', 'focus', 'peace', 'calm', 'concentrate'],
      ['quiet', 'independen', 'mature', 'private', 'study'],
    ],
    [
      ['cook', 'kitchen', 'meal', 'food', 'groceries', 'eat', 'diet'],
      ['cook', 'kitchen', 'meal', 'food', 'diet', 'grocery'],
    ],
    [
      ['privacy', 'private', 'alone', 'own room', 'single', 'lockable'],
      ['privacy', 'private', 'own', 'lockable', 'single'],
    ],
    [
      ['air condition', ' ac ', 'cool', 'hot summer', 'heat'],
      ['air condition', 'ac'],
    ],
    [
      ['modern', 'new', 'renovate', 'updated', 'newest'],
      ['modern', 'newest', 'renovated', 'light'],
    ],
    [
      ['close', 'near campus', 'walk', 'location', 'proximity', 'commute'],
      ['location', 'campus', 'close', 'walk', 'minute'],
    ],
    [
      ['sustainab', 'environment', 'green', 'local food', 'organic'],
      ['sustainab', 'local', 'environment', 'green'],
    ],
    [
      ['gym', 'fitness', 'exercise', 'workout', 'sport'],
      ['gym', 'fitness', 'exercise'],
    ],
    [
      ['cheap', 'affordable', 'budget', 'save money', 'cost'],
      ['save', 'budget', 'money', 'afford', 'optional'],
    ],
    [
      ['independence', 'independent', 'freedom', 'flexible'],
      ['independen', 'freedom', 'flexible', 'mature'],
    ],
    [
      ['inclusive', 'gender', 'diversity', 'accessibility'],
      ['inclusive', 'gender', 'accessib', 'all-gender'],
    ],
    [
      ['fresh food', 'local', 'dining', 'cafeteria', 'meal plan'],
      ['dining', 'food', 'meal plan', 'bistro', 'eatery', 'cafeteria'],
    ],
  ];

  const matched: string[] = [];

  for (const [inputKws, proKws] of rules) {
    if (!inputKws.some((kw) => lower.includes(kw))) continue;
    const candidates = [...r.pros, ...r.unique_features, r.best_for];
    const hit = candidates.find((c) =>
      proKws.some((pk) => c.toLowerCase().includes(pk))
    );
    if (hit && !matched.includes(hit)) matched.push(hit);
    if (matched.length >= 3) break;
  }

  if (matched.length === 0) matched.push(...r.pros.slice(0, 2));

  return matched.slice(0, 3).join(' \u00B7 ');
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
    // Query Upstash Vector — the built-in embedding model converts
    // the raw query text to a vector on Upstash's infrastructure.
    // No local model loading, no cold start, instant response.
    const queryResults = await vectorIndex.query({
      data: inputText,
      topK: 6,
      includeVectors: true,
      includeMetadata: true,
    });

    // Map Upstash results back to RESIDENCE_DATA indices
    const idToIndex = new Map(RESIDENCE_DATA.map((r, i) => [r.id, i]));
    const matchedIndices: number[] = [];
    const embeddings = new Map<number, number[]>();
    const semanticScores = new Map<number, number>();

    for (const result of queryResults) {
      const idx = idToIndex.get(result.id as string);
      if (idx !== undefined) {
        matchedIndices.push(idx);
        if (result.vector) embeddings.set(idx, result.vector as number[]);
        semanticScores.set(idx, result.score);
      }
    }

    const styles = RESIDENCE_DATA.map((r) => r.style);

    // Hybrid scores: 55 % structured + 45 % semantic
    const hybridScores = new Map<number, number>();
    for (const idx of matchedIndices) {
      const semantic = semanticScores.get(idx) ?? 0;
      const structured = structuredScore(
        RESIDENCE_DATA[idx],
        room ?? '',
        mealplan ?? ''
      );
      hybridScores.set(idx, structured * 0.55 + semantic * 0.45);
    }

    // Sort by hybrid score descending before MMR
    const sortedIndices = [...matchedIndices].sort(
      (a, b) => (hybridScores.get(b) ?? 0) - (hybridScores.get(a) ?? 0)
    );

    // MMR: lambda=0.4 → diversity-biased + style-group penalty
    const diverseIndices = mmrHybrid(
      sortedIndices,
      embeddings,
      hybridScores,
      styles,
      0.4,
      3
    );

    const results: ResidenceResult[] = diverseIndices.map((idx) => {
      const r = RESIDENCE_DATA[idx];
      const score = hybridScores.get(idx) ?? 0;
      return {
        id: r.id,
        name: r.name,
        shortDescription: r.short_description,
        relevanceScore: score,
        matchPercentage: Math.round(Math.min(score * 115, 99)),
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
