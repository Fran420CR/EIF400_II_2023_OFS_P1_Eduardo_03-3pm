import fs from 'fs/promises';
import path from 'path';

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
