import express from "express";
import { verifyUser } from "../helpers/verifyUser.js";
import { checkoutPayment, stripeWebhook } from "../controllers/paymentController.js";

const router = express.Router();

router.post('/checkout-payment', verifyUser, checkoutPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;
