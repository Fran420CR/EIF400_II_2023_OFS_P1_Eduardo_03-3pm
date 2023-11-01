
import { NextApiRequest, NextApiResponse } from 'next';
import { getKeywordsList } from '../../data/CRUD/CRUD';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const keywordsList = getKeywordsList();
    res.status(200).json({ keywords: keywordsList });
  } else {
    res.status(405).end(); // Método no permitido
  }
}
