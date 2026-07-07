import * as CarModel from "../models/carModel.js";

export function getCars(req, res) {
    const cars = CarModel.getAll();

    return res.status(200).json(cars);
}

export function addCar(req, res) {
    const car = req.body;

    CarModel.add(car);

    return res.status(201).json({
        message: "Car added successfully",
        data: car
    });
}

export function updateCar(req, res) {
    const updated = CarModel.update(req.params.id, req.body);

    if (!updated) {
        return res.status(404).json({
            error: "Car not found"
        });
    }

    res.json({
        message: "Car updated successfully"
    });
}

export function deleteCar(req, res) {
    const deleted = CarModel.del(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            error: "Car not found"
        });
    }

    res.json({
        message: "Car deleted successfully"
    });
}