import Stripe from "stripe";
import { bd } from "../bd.js";
import dotenv from 'dotenv';

dotenv.config();

const STRIPE_SECRET_KEY = "sk_test_51POYHLGqmHQNBz36jK488m4fsA4btiwqaqJ7d2EP5nazVfRKu57NKTdF51BTIOfWYDK3I1wufvOb0mXjV3Yu2A9n00j5gWt7Da";
const stripe = new Stripe(STRIPE_SECRET_KEY);

// export const addOrder = async (userId, items) => {
//     console.log("start order");
//     console.log(items);
//     try {
//         if (!Array.isArray(items)) {
//             throw new Error('Items should be an array');
//         }
        
//         console.log("start order 1");
//         const calculateTotalAmount = (items) => {
//         return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         };
//         const [orderResult] =  bd.query(
//             "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
//             [userId, calculateTotalAmount(items)]
//         );

//         const orderId = orderResult.insertId;
// console.log("start order 2")
//         const queryAddOrderLine = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
        
//         const promises = items.map(item =>
//             bd.query(queryAddOrderLine, [orderId, item.productId, item.quantity, item.price])
//         );

//         await Promise.all(promises);

//         return orderId;

//     } catch (error) {
//         console.error('Error in addOrder:', error.message);
//         throw new Error(`Failed to add order: ${error.message}`);
//     }
// };


 const calculateTotalAmount = (items) => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        };

export const checkoutPayment = async (req, res) => {
    console.log("start payment");
    try {
        const { userId, items } = req.body;
console.log(items)
          const params = {
            payment_method_types: ['card'],
            line_items: items.map((item) => ({
                price_data: {
                    currency: 'EUR',
                    product_data: {
                        name: item.title,  
                        images:["https://i.imgur.com/EHyR2nP.png"]
                    },
                    
                    unit_amount: item.price * 100,  
                },
                quantity: item.quantite,  
            })),
            mode: 'payment',
            success_url: `http://localhost:3000/success?userId=${userId}`,
            cancel_url: `http://localhost:3000/cancel?userId=${userId}`,
          };

        const session = await stripe.checkout.sessions.create(params);

        const totalAmount = calculateTotalAmount(items);

        bd.query(
            "INSERT INTO payment (user_id, stripe_payment_id, amount, currency, status, payment_date) VALUES (?, ?, ?, ?, ?, NOW())",
            [userId, session.id, totalAmount, 'EUR', 'pending']
        );

        res.status(200).json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            await handlePaymentStatus(session.id, 'succeeded');
            break;
        }
        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;
            await handlePaymentStatus(session.id, 'failed');
            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).end();
};


export const handlePaymentStatus = async (stripePaymentId, status) => {
    try {
        const [payment] =  bd.query(
            "SELECT * FROM payments WHERE stripe_payment_id = ?",
            [stripePaymentId]
        );

        if (!payment || payment.length === 0) {
            throw new Error('Payment not found');
        }

        const paymentInfo = payment[0];

         bd.query(
            "UPDATE payments SET status = ?, payment_date = NOW() WHERE id = ?",
            [status, paymentInfo.id]
        );
        
        if (status === 'succeeded') {
             bd.query(
                "UPDATE orders SET status = 'paid' WHERE id = ?",
                [paymentInfo.order_id]
            );
        }

    } catch (error) {
        console.error(`Failed to handle payment status update: ${error.message}`);
    }
};
