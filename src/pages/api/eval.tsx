
import { NextApiRequest, NextApiResponse } from 'next';
import { readRAFakeFile } from '../../data/CRUD/CRUD';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const scriptContent = await readRAFakeFile();
      if (scriptContent) {
        res.status(200).json({ success: true, result: scriptContent });
      } else {
        res.status(500).json({ success: false, error: 'Error al leer el archivo ra_fake.txt.' });
      }
    } catch (error) {
      console.error('Error al leer el archivo ra_fake.txt:', error);
      res.status(500).json({ success: false, error: 'Error al leer el archivo ra_fake.txt.' });
    }
  } else {
    res.status(405).end();
  }
}
