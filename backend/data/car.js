import mongoose from 'mongoose'

const carSchema = mongoose.Schema({
    model: {
        required: true,
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum:['Sedan', 'SUV', 'Hatchback', 'Sports', 'Electric']
    },
    rate: {
        required: true,
        type: Number
    },
    available: {
        required: true,
        type: Boolean
    },
    image: {
        required: false,
        type: String
    },
    plateNumber: {
        type: String,
        required: true,
        trim: true
    }
})

const car = mongoose.model('Car', carSchema, 'cars')

export default car