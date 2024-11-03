import type { NextApiRequest, NextApiResponse } from 'next';
import { DataAPIClient, VectorDoc, UUID } from '@datastax/astra-db-ts';
import { pipeline } from '@xenova/transformers';

interface Idea extends VectorDoc {
  idea: string;
}

export default async function find_residence(req: any, res: any) {
  if (req.method === 'POST') {
    const { inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({ error: 'No hello' });
    }

    try {
      const api_key: string = process.env.ASTRA_API_KEY || '';
      const api_endpoint: string = process.env.ASTRA_API_ENDPOINT || '';
      if (!api_key || !api_endpoint) {
        throw new Error('Environment variables ASTRA_API_KEY or ASTRA_API_ENDPOINT are missing.');
      }

      const client = new DataAPIClient(api_key);
      const db = client.db(api_endpoint);

      if (!db) {
        throw new Error('Failed to connect to the database.');
      }

      const collection = db.collection<Idea>('residences');

      const pipe = await pipeline('feature-extraction', 'Supabase/gte-small');
      const output = await pipe(inputText, {
        pooling: 'mean',
        normalize: true,
      });

      const embedding: number[] = Array.from(output.data);
      const queryVector = embedding;

      const cursor = await collection.find({}, {
        sort: { $vector: queryVector },
        limit: 1,
        includeSimilarity: true,
      });

      const results = [];
      for await (const doc of cursor) {
        results.push({ idea: doc.idea, similarity: doc.$similarity });
      }

      return res.status(200).json({ results });

    } catch (error) {
      console.error('Error in API route:', error);
      return res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
