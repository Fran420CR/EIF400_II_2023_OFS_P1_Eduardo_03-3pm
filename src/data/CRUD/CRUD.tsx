import fs from 'fs/promises';
import fsm from 'fs';
import path from 'path';
import { parse, UrlWithParsedQuery } from 'url';
//save
const scriptsDirectory = path.join(process.cwd(), '/src/scripts');
const EXTENSION_DEFAULT = 'txt';

export async function saveFile({ extension, fileName, scriptContent }: any) {
  try {
    if (extension === fileName) {
      const filePath = path.join(scriptsDirectory, `${fileName}.${EXTENSION_DEFAULT}`);
      await fs.writeFile(filePath, scriptContent, 'utf8');
    } else {
      const filePath = path.join(scriptsDirectory, `${fileName}.${extension}`);
      await fs.writeFile(filePath, scriptContent, 'utf8');
    }
    return { success: true, message: 'Archivo guardado exitosamente.' };
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
    return { success: false, error: 'Error al guardar el archivo.' };
  }
}


//about
const aboutDataFilePath = path.join(process.cwd(), '/src/infoMembers.json');

export function getAboutData() {
  try {
    const aboutData = JSON.parse(fsm.readFileSync(aboutDataFilePath, 'utf8'));
    return aboutData;
  } catch (error) {
    console.error('Error al cargar datos de About:', error);
    throw new Error('Error al cargar datos de About');
  }
}


//script
export function getScriptContent(id: string): string | null {
  const scriptFilePath = path.join(scriptsDirectory, id);

  if (fsm.existsSync(scriptFilePath)) {
    try {
      return fsm.readFileSync(scriptFilePath, 'utf8');
    } catch (error) {
      console.error('Error al cargar el script:', error);
      throw new Error('Error al cargar el script');
    }
  }

  return null;
}


//eval
const raFakeFilePath = path.join(process.cwd(), '/src/ra_fake.txt');

export async function readRAFakeFile(): Promise<string | null> {
  try {
    const scriptContent = await fs.readFile(raFakeFilePath, 'utf8');
    return scriptContent;
  } catch (error) {
    console.error('Error al leer el archivo ra_fake.txt:', error);
    return null;
  }
}


//keywords
export function getKeywordsList(): string[] {
  const keywordsFilePath = path.join(process.cwd(), '/src/keywords.json');
  try {
    const keywordsData = fsm.readFileSync(keywordsFilePath, 'utf8');
    return JSON.parse(keywordsData); // Devolver los datos analizados
  } catch (error) {
    console.error('Error al cargar la lista de palabras clave:', error);
    return [];
  }
}





//process
export async function processText( fileName: string):  Promise<string | null> {
  const file = fileName.replace("ofs", "mjs");
  const FilePath = path.join(process.cwd(), `/src/test.ofs/${file}`);

  try {
    const scriptContent = await fs.readFile(FilePath, 'utf8');
    return scriptContent;

  } catch (error) {

    console.error('Error al leer el archivo', error);
    return null;
  }
}









//words

function loadKeywordsList(): string[] {
  const keywordsFilePath = path.join(process.cwd(), '/src/keywords.json');
  try {
    const keywordsData = fsm.readFileSync(keywordsFilePath, 'utf8');
    return JSON.parse(keywordsData);
  } catch (error) {
    console.error('Error loading keywords list:', error);
    return [];
  }
}

export function checkKeyword(urlString: string | undefined): { success: boolean; data?: Record<string, any>; error?: string } {
  if (!urlString) {
    return { success: false, error: 'URL mal formateada' };
  }

  const parsedUrl: UrlWithParsedQuery = parse(urlString, true);

  if (parsedUrl.query && parsedUrl.query.key) {
    const key: string = parsedUrl.query.key as string;
    const keywordsList: string[] = loadKeywordsList();
    const isKeywordResult: boolean = keywordsList.includes(key.trim());
    const data = { text: key, isKeyword: isKeywordResult };
    return { success: true, data };
  } else {
    return { success: false, error: 'Falta el parámetro "key" en la URL' };
  }
}