import * as CarModel from "../models/carModel.js";

export async function getCars(req, res) {
    const cars = await CarModel.getAll();

    return res.status(200).json(cars);
}

export async function addCar(req, res) {
    const newCar = await CarModel.add(req.body);
    const carObject = newCar.toObject
        ? newCar.toObject({ versionKey: false })
        : JSON.parse(JSON.stringify(newCar));

    if (!carObject.id && carObject._id) {
        carObject.id = carObject._id;
        delete carObject._id;
    }

    return res.status(201).json({
        message: "Car added successfully",
        data: carObject
    });
}

export async function updateCar(req, res) {
    const id = req.params.id || req.body.id || req.body._id;

    if (!id) {
        return res.status(400).json({
            error: "Car id is required for update"
        });
    }

    const updatedCar = await CarModel.update(id, req.body);

    if (!updatedCar) {
        return res.status(404).json({
            error: "Car not found"
        });
    }

    const carObject = updatedCar.toObject
        ? updatedCar.toObject({ versionKey: false })
        : JSON.parse(JSON.stringify(updatedCar));

    if (!carObject.id && carObject._id) {
        carObject.id = carObject._id;
        delete carObject._id;
    }

    return res.status(200).json({
        message: "Car updated successfully",
        data: carObject
    });
}

export async function deleteCar(req, res) {
    const deletedCar = await CarModel.del(req.params.id);

    if (!deletedCar) {
        return res.status(404).json({
            error: "Car not found"
        });
    }

    return res.status(200).json({
        message: "Car deleted successfully"
    });
}