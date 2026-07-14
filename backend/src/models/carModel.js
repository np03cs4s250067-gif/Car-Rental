import mongoose from "mongoose";
import car from "../../data/car.js";

const { ObjectId } = mongoose.Types;

export async function getAll() {
    return await car.find();
}

export async function add(newCar) {
    return await car.create(newCar);
}

export async function update(id, newCar) {
    const updateId = new ObjectId(id);
    return await car.findByIdAndUpdate(updateId, newCar, {
        new: true,
        runValidators: true
    });
}

export async function del(id) {
    return await car.findByIdAndDelete(id);
}