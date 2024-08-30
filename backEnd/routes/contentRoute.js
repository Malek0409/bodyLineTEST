import express from "express"
import { saveContent, getContent } from "../controllers/content.js";

const router = express.Router();

router.post('/content/:type', saveContent);
router.get('/getContent/:type', getContent)


export default router;