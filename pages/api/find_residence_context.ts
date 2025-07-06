import type { NextApiRequest, NextApiResponse } from 'next';

export default async function find_residence_context(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { inputText } = req.body;
    
    if (!inputText) {
      return res.status(400).json({ error: 'No input text provided' });
    }
    try {
        const response = await fetch(
            `https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: inputText,
            }
        ); 
        const result = await response.toString();

        return res.status(200).json({ result });

    } catch (error) {
      console.error('Error in API route:', error);
      return res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
