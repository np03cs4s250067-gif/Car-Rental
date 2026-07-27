import mongoose from "mongoose";
import car from "../data/car.js";

export async function getAll() {
    return await car.find();
}

export async function add(newCar) {
    return await car.create(newCar);
}

export async function update(id, newCar) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    const objectId = new mongoose.Types.ObjectId(id);

    return await car.findByIdAndUpdate(objectId, newCar, {
        new: true,
        runValidators: true
    });
}

export async function del(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    const objectId = new mongoose.Types.ObjectId(id);

    return await car.findByIdAndDelete(objectId);
}