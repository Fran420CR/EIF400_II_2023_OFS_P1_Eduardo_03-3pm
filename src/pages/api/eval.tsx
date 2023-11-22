

import { exec } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      const fileName:string = req.body.script;
      const file = fileName.replace("ofs","mjs");
      
    
      const scriptPath = `./src/test.ofs/${file}`;

      exec(`node --experimental-modules ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
          res.status(500).json({ success: false, error: 'Error al ejecutar el script', stderr });
        } else {
          res.status(200).json({ success: true, result: stdout });
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, error: 'Error al evaluar' });
    }
  } else {
    res.status(405).end();
  }
}


