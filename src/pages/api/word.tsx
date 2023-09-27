import { parse, UrlWithParsedQuery } from 'url';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

function loadKeywordsList(): string[] {
  const keywordsFilePath = path.join(process.cwd(), '/src/keywords.json');
  try {
    const keywordsData = fs.readFileSync(keywordsFilePath, 'utf8');
    return JSON.parse(keywordsData);
  } catch (error) {
    console.error('Error loading keywords list:', error);
    return [];
  }
}

function isKeyword(key: string, keywordsList: string[]): boolean {
  return keywordsList.includes(key.trim());
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const urlString: string | undefined = req.url; // Obtener la URL como una cadena
    const parsedUrl: UrlWithParsedQuery | undefined = parse(urlString || '', true);

    if (parsedUrl) {
      const key: string = parsedUrl.query.key as string;
      const keywordsList: string[] = loadKeywordsList();
      const isKeywordResult: boolean = isKeyword(key, keywordsList);
      const data = { text: key, isKeyword: isKeywordResult };
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ error: 'URL mal formateada' });
    }
  } else {
    return res.status(405).end(); // Método no permitido
  }
}
