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
const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://dulcet-piroshki-05a4df.netlify.app'
]

const envOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim().replace(/\/$/, ''))
  : []

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envOrigins]))

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true)
    
    const cleanOrigin = origin.replace(/\/$/, '')
    
    if (allowedOrigins.includes(cleanOrigin) || /\.netlify\.app$/.test(cleanOrigin)) {
      return callback(null, true)
    }
    
    console.warn(`Blocked CORS request from origin: ${origin}`)
    return callback(null, false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('API is working')
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