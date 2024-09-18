import express from "express"
import multer from "multer";
import { addProduct, getProduct }
    from "../controllers/productControllers.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/addProduct', upload.single('productPicture'), addProduct)
router.get('/getProduct', getProduct)


export default router;