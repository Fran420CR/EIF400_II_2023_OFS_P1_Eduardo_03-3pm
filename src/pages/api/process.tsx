import { NextApiRequest, NextApiResponse } from 'next';
import { processText } from '../../data/CRUD/CRUD';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const timestamp: string = new Date().toISOString();
    const fileName: string = req.body.fileName;
    const result = await processText(fileName);


    const file = fileName.replace("ofs", "mjs");

    res.status(200).json({message: `Echo from server ${timestamp}`, result:result, file: file});
  } else {
    res.status(405).end();
  }
}
