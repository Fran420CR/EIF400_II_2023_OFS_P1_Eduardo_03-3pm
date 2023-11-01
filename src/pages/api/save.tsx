import { NextApiRequest, NextApiResponse } from 'next';
import { saveFile } from '../../data/save/CRUD';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { extension, fileName, scriptContent } = req.body;
      const result = await saveFile({ extension, fileName, scriptContent });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error al guardar el archivo.' });
    }
  } else {
    res.status(405).end();
  }
}
