import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import dbConnection from './config/db.js'
import carRoutes from './routes/carRoutes.js'
import bookingRoutes from "./routes/bookingRoutes.js"
import authRoutes from './routes/authRoutes.js'
import aiRouter from './routes/aiRoutes.js'

dotenv.config()

const app = express()

// CORS configuration
app.use(cors(
  {
    origin:(origin, callback)=>{
      if(!origin || 
        ['http://localhost:5173', process.env.FRONTEND_URL].includes(origin)
      ){
        return callback(null, true)
      }
      callback(new Error("CORS origin not allowed"))
    }
    ,credentials:true
  }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Car Rental API is running')
})

app.get('/health', (req,res) => res.status(200).json({ok: true}))
// Mount routes
app.use('/auth', authRoutes)
app.use('/cars', carRoutes)
app.use('/bookings', bookingRoutes)
app.use('/ai', aiRouter)

await dbConnection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})