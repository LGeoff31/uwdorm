import type { NextApiRequest, NextApiResponse } from 'next';
import { vectorIndex } from '../../utils/upstash';
import { RESIDENCE_DATA } from '../../utils/residenceData';

/**
 * Build a rich text document for each residence so the embedding model
 * captures the full semantic scope (amenities, pros, cons, style, etc.).
 */
function buildDocument(r: (typeof RESIDENCE_DATA)[number]): string {
  return [
    r.name,
    r.short_description,
    r.detailed_description,
    r.unique_features.join('. '),
    `Pros: ${r.pros.join(', ')}`,
    `Cons: ${r.cons.join(', ')}`,
    `Best for: ${r.best_for}`,
    `Room types: ${r.room_types.join(', ')}`,
    `Meal plan: ${r.meal_plan}`,
    `Amenities: ${r.amenities.join(', ')}`,
    `Style: ${r.style}`,
    `Location: ${r.location_notes}`,
  ]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * POST /api/seed-vectors
 *
 * One-time endpoint: upserts all 6 residence documents into the
 * Upstash Vector index.  Upstash's built-in embedding model converts
 * the raw text to vectors automatically.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const vectors = RESIDENCE_DATA.map((r) => ({
      id: r.id,
      data: buildDocument(r),
      metadata: { name: r.name, style: r.style },
    }));

    await vectorIndex.upsert(vectors);

    return res.status(200).json({
      success: true,
      message: `Seeded ${vectors.length} residence vectors`,
      ids: vectors.map((v) => v.id),
    });
  } catch (error) {
    console.error('[seed-vectors] Error:', error);
    return res.status(500).json({ error: 'Failed to seed vectors' });
  }
}
