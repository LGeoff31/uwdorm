import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Deprecated - use POST /api/seed-vectors instead.
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(410).json({ error: 'Deprecated. Use POST /api/seed-vectors instead.' });
}
