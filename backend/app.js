import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './src/config/db.js'
import carRoutes from './src/routes/carRoutes.js'
import bookingRoutes from "./src/routes/bookingRoutes.js";


const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.use(carRoutes);
app.use(bookingRoutes);

await dbConnection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})