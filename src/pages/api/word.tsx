
import { NextApiRequest, NextApiResponse } from 'next';
import { checkKeyword } from '../../data/CRUD/CRUD';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const urlString: string | undefined = req.url; // Obtener la URL como una cadena
    const result = checkKeyword(urlString);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
