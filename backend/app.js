import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

import carRoutes from './src/routes/carRoutes.js'
import bookingRoutes from "./src/routes/bookingRoutes.js";


const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.use(carRoutes);
app.use(bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})