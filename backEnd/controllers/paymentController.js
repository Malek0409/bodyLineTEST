import Stripe from "stripe";
import { bd } from "../bd.js";
import dotenv from 'dotenv';

dotenv.config();

const STRIPE_SECRET_KEY = "sk_test_51POYHLGqmHQNBz36jK488m4fsA4btiwqaqJ7d2EP5nazVfRKu57NKTdF51BTIOfWYDK3I1wufvOb0mXjV3Yu2A9n00j5gWt7Da";
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const addOrder = async (userId, items) => {
    console.log("start order");
    console.log(items);
    try {
        if (!Array.isArray(items)) {
            throw new Error('Items should be an array');
        }
        
        console.log("start order 1");

        // Utiliser `await` car `query` retourne une promesse
        const [orderResult] =  bd.query(
            "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
            [userId, calculateTotalAmount(items)]
        );

        const orderId = orderResult.insertId;

        const queryAddOrderLine = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
        
        const promises = items.map(item =>
            bd.query(queryAddOrderLine, [orderId, item.productId, item.quantity, item.price])
        );

        await Promise.all(promises);

        return orderId;

    } catch (error) {
        console.error('Error in addOrder:', error.message);
        throw new Error(`Failed to add order: ${error.message}`);
    }
};


const calculateTotalAmount = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const checkoutPayment = async (req, res) => {
    console.log("start payment")
    try {
        const { userId, items } = req.body;

        const orderId = await addOrder(userId, items);

        const params = {
            payment_method_types: ['card'],
            line_items: items.map((item) => ({
                price_data: {
                    currency: 'EUR',
                    product_data: { name: item.name },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `http://localhost:3000/success?order_id=${orderId}`,
            cancel_url: `http://localhost:3000/cancel?order_id=${orderId}`,
        };

        const session = await stripe.checkout.sessions.create(params);

        // Enregistrez le paiement en tant que "pending"
        bd.query(
            "INSERT INTO payments (order_id, stripe_payment_id, amount, status) VALUES (?, ?, ?, ?)",
            [orderId, session.id, calculateTotalAmount(items), 'pending']
        );

        res.status(200).json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Gérer les webhooks Stripe
export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gérez les événements spécifiques
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await handlePaymentSuccess(session.id);
    }

    res.status(200).end();
};

// Gérer le succès du paiement
export const handlePaymentSuccess = async (stripePaymentId) => {
    try {
        const [payment] = bd.query(
            "SELECT * FROM payments WHERE stripe_payment_id = ?",
            [stripePaymentId]
        );

        if (payment.length === 0) {
            throw new Error('Payment not found');
        }

        const paymentInfo = payment[0];

        // Mettre à jour le statut de la commande
        bd.query(
            "UPDATE orders SET status = 'paid' WHERE id = ?",
            [paymentInfo.order_id]
        );

        // Mettre à jour le statut du paiement
        bd.query(
            "UPDATE payments SET status = 'succeeded' WHERE id = ?",
            [paymentInfo.id]
        );
    } catch (error) {
        console.error(`Failed to handle payment success: ${error.message}`);
    }
};
