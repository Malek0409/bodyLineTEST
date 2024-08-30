

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const saveContent = (req, res) => {
  const { content } = req.body;
  const { type } = req.params;
  
  
  const filePath = path.join(__dirname, `../filePages/${type}.txt`);

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      console.error('Erreur lors de la sauvegarde du fichier:', err);
      return res.status(500).json({ status: 'Error', message: 'Erreur lors de la sauvegarde.' });
    }
    console.log('Le fichier a été sauvegardé avec succès.');
    return res.status(200).json({ status: 'Success', message: 'Le contenu a été sauvegardé avec succès.' });
  });
};

export const getContent = (req, res) => {
  const { type } = req.params;
  const filePath = path.join(__dirname, `../filePages/${type}.txt`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      return res.status(500).json({ status: 'Error', message: 'Erreur lors de la lecture du fichier.' });
    }
    return res.status(200).json({ status: 'Success', content: data });
  });
};
