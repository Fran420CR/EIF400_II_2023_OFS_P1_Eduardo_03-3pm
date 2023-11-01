import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const scriptsDirectory = path.join(process.cwd(), '/src/scripts');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query as { id: string }; // Obtén el scriptId de los parámetros de consulta

    const scriptFilePath = path.join(scriptsDirectory, id);

    // Verifica la existencia del archivo
    if (fs.existsSync(scriptFilePath)) {
      try {
        const scriptContent = fs.readFileSync(scriptFilePath, 'utf8');

        const ext = path.extname(scriptFilePath).slice(1); // Elimina el punto del inicio de la extensión
        res.setHeader('Content-Type', 'text/plain');

        res.status(200).send(scriptContent);
      } catch (error) {
        console.error('Error al cargar el script:', error);
        res.status(500).json({ error: 'Error al cargar el script' });
      }
    } else {
      res.status(404).json({ error: 'El archivo no existe' });
    }
  } else {
    res.status(405).end();
  }
}
