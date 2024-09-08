import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin du dossier où les fichiers sont stockés
const getFilePath = (type) => path.join(__dirname, `../filePages/${type}.txt`);

// Sauvegarder le contenu dans un fichier
export const saveFile = (type, content) => {
  const filePath = getFilePath(type);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Lire le contenu d'un fichier
export const readFile = (type) => {
  const filePath = getFilePath(type);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
