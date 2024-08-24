import express from "express"
import { getContent } from "../controllers/content.js";

const router = express.Router();

router.get('/getContent', getContent)



export default router;