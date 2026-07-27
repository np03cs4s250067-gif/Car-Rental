import mongoose from "mongoose";
import booking from "../data/booking.js";

export async function add(newBooking) {
    return await booking.create(newBooking);
}

export async function cancel(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    const objectId = new mongoose.Types.ObjectId(id);

    return await booking.findByIdAndUpdate(
        objectId,
        { status: "Cancelled" },
        { new: true }
    );
}

export async function getByUser(userId) {
    return await booking.find({ userId }).populate("carId");
}

export async function getAll() {
    return await booking.find().populate("carId");
}

export async function getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return await booking.findById(id).populate("carId");
}