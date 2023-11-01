
import { NextApiRequest, NextApiResponse } from 'next';
import { getAboutData } from '../../data/CRUD/CRUD';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const aboutData = getAboutData();
      res.status(200).json(aboutData);
    } catch (error) {
      console.error('Error al cargar datos de About:', error);
      res.status(500).json({ error: 'Error al cargar datos de About' });
    }
  } else {
    res.status(405).end();
  }
}
