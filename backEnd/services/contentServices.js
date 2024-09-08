import { saveFile, readFile } from "../model/contentModel.js";

export const saveContentService = async (type, content) => {
  try {
    await saveFile(type, content);
    return { status: 'Success', message: 'Le contenu a été sauvegardé avec succès.' };
  } catch (error) {
    throw new Error('Erreur lors de la sauvegarde du fichier.');
  }
};

export const getContentService = async (type) => {
  try {
    const content = await readFile(type);
    return { status: 'Success', content };
  } catch (error) {
    throw new Error('Erreur lors de la lecture du fichier.');
  }
};
