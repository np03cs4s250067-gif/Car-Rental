import express from "express"

import carRoutes from './src/routes/carRoutes.js'
import bookingRoutes from "./src/routes/bookingRoutes.js";


const app = express()
app.use(express.json())
const PORT = 3001

app.use(carRoutes);
app.use(bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})