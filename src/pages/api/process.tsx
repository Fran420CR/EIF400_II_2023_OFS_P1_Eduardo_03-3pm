import { NextApiRequest, NextApiResponse } from 'next';
import { processText } from '../../data/CRUD/CRUD';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const timestampedText: string = req.body.text;
    const result = processText(timestampedText);
    res.status(200).json(result);
  } else {
    res.status(405).end();
  }
}
