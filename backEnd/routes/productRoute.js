import express from "express"
import multer from "multer";
import { addProduct, getProduct, getProductByRand, updateProduct } from "../controllers/product.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addProduct', upload.single('productPicture'), addProduct)
router.get('/getProduct', getProduct)
router.get('/getProductByRand/:productId', getProductByRand)
router.post('/updateProduct', updateProduct)


export default router;