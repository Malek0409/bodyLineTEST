import express from "express"
import cors from "cors"
import cookiesParser from "cookie-parser"
import authRoutes from "./routes/authRoute.js"
import productRoutes from "./routes/productRoute.js"
import contentRoutes from "./routes/contentRoute.js"
import cartRoutes from "./routes/cartRoute.js"
import paymentRoutes from "./routes/paymentRoute.js"
import bodyParser from "body-parser"



const app = express()
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' })); 
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookiesParser())
app.use(authRoutes);
app.use(productRoutes);
app.use(contentRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);



app.listen(8080, () => {
    console.log("running server")
})