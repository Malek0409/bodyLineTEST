import { saveContentService, getContentService } from "../services/contentServices.js";

export const saveContent = async (req, res) => {
  try {
    const { content } = req.body;
    const { type } = req.params;

    const result = await saveContentService(type, content);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Erreur lors de la sauvegarde du fichier:', err.message);
    return res.status(500).json({ status: 'Error', message: err.message });
  }
};

export const getContent = async (req, res) => {
  try {
    const { type } = req.params;

    const result = await getContentService(type);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Erreur lors de la lecture du fichier:', err.message);
    return res.status(500).json({ status: 'Error', message: err.message });
  }
};
