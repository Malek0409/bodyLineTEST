import express from "express"
import { getContent } from "../controllers/content";

const router = express.Router();

router.get('/getContent', getContent)



export default router;