
/*
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
*/
import { spawn } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const fileName: string = req.body.script;
      const file = fileName.replace("ofs", "mjs")

      const scriptPath = `../../test.ofs/${file}`;
      const childProcess = spawn('node', ['--experimental-modules', scriptPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let scriptOutput = '';

      childProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
      });

      childProcess.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      childProcess.on('close', (code) => {
        if (code === 0) {
          res.status(200).json({ success: true, result: scriptOutput });
        } else {
          res.status(500).json({ success: false, error: 'Error al ejecutar el script' });
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error al evaluar' });
    }
  } else {
    res.status(405).end();
  }
}

