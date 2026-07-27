import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Booked", "Cancelled"],
        default: "Booked"
    }
});

const booking = mongoose.model("Booking", bookingSchema, "bookings");

export default booking;