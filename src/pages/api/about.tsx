import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).send('About page (to be implemented)');
  } else {
    res.status(405).end(); // Método no permitido
  }
}
