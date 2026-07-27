import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import dbConnection from './config/db.js'
import carRoutes from './routes/carRoutes.js'
import bookingRoutes from "./routes/bookingRoutes.js"
import authRoutes from './routes/authRoutes.js'

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

app.get('/health', (req,res) => res.status(200).json({ok: true}))
// Mount auth routes
app.use('/auth', authRoutes)

// Mount car and booking routes both at /api prefix and root level for maximum flexibility
app.use('/cars', carRoutes)
app.use('/bookings', bookingRoutes)

app.use('/api/cars', carRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/auth', authRoutes)

await dbConnection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
