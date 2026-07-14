import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
})

const dbConnection = async()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB successfully connected")
    }catch(error){
        console.log(`MongoDB cannot be connected ${error.message}`)
        process.exit()
    }
}

export default dbConnection