import express from "express"
import { verifyUser } from "../helpers/verifyUser.js";

import { addProductToCart, getProductToCartLine, deleteProductFromCart, updateProductToCart } from "../controllers/cartController.js";

const router = express.Router();



router.post('/addProductToCart', verifyUser, addProductToCart)
router.get('/getProductToCartLine', verifyUser, getProductToCartLine)
router.post('/deleteProductFromCart', verifyUser, deleteProductFromCart)
router.post('/updateProductToCart', verifyUser, updateProductToCart)



export default router;