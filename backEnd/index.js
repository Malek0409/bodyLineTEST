import express from "express"
import cors from "cors"
import cookiesParser from "cookie-parser"
import authRoutes from "./routes/authRoute.js"
import productRoutes from "./routes/productRoute.js"
import contentRoutes from "./routes/contentRoute.js"



const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true
}))
app.use(cookiesParser())
app.use(authRoutes);
app.use(productRoutes);
app.use(contentRoutes);

app.listen(8080, () => {
    console.log("running server")
})