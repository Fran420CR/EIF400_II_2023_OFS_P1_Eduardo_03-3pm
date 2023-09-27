import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const timestampedText: string = req.body.text;
    const timestamp: string = new Date().toISOString();

    console.log(timestampedText);

    const responseJson = {
      message: `Echo from server: at ${timestamp}`,
      result: timestampedText,
    };

    res.status(200).json(responseJson);
  } else {
    res.status(405).end();
  }
}
