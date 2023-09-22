import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'url';
import fs from 'fs';
import path from 'path';

function loadKeywordsList() {
  const keywordsFilePath = path.join(process.cwd(), '/src/keywords.json');
  try {
    const keywordsData = fs.readFileSync(keywordsFilePath, 'utf8');
    return JSON.parse(keywordsData);
  } catch (error) {
    console.error('Error loading keywords list:', error);
    return [];
  }
}

function isKeyword(key: string, keywordsList: string[]) {
  return keywordsList.includes(key.trim());
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { query } = parse(req.url || '', true);
    const key = query.key as string;
    const keywordsList = loadKeywordsList(); // Asegúrate de tener una función `loadKeywordsList` como se definió anteriormente en `keywords.js`.
    const isKeywordResult = isKeyword(key, keywordsList);
    const data = { text: key, isKeyword: isKeywordResult };
    return res.status(200).json(data);
  } else {
    return res.status(405).end(); 
  }
}
