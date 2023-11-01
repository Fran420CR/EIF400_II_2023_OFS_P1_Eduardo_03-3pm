
import { NextApiRequest, NextApiResponse } from 'next';
import { getScriptContent } from '../../data/CRUD/CRUD';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query as { id: string };

    try {
      const scriptContent = getScriptContent(id);
      if (scriptContent) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(scriptContent);
      } else {
        res.status(404).json({ error: 'El archivo no existe' });
      }
    } catch (error) {
      console.error('Error al cargar el script:', error);
      res.status(500).json({ error: 'Error al cargar el script' });
    }
  } else {
    res.status(405).end();
  }
}
