import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const timestampedText = `Echo from server: at ${new Date().toISOString()}: ${req.body.text}`;
    console.log(timestampedText);
    res.status(200).json({ result: timestampedText });
  } else {
    res.status(405).end(); // Método no permitido
  }
  
}
