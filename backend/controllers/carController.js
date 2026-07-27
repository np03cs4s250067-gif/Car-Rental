import * as CarModel from "../models/carModel.js";
import Car from "../data/car.js";
import booking from "../data/booking.js";

export async function getCars(req, res) {
    try {
        const queryDate = req.query.date ? new Date(req.query.date) : null;
        let query = {};

        if (queryDate) {
            // Find bookings that overlap with this date
            const activeBookings = await booking.find({
                status: "Booked",
                startDate: { $lte: queryDate },
                endDate: { $gte: queryDate }
            });
            const bookedCarIds = activeBookings.map(b => b.carId);
            query._id = { $nin: bookedCarIds };
        }

        const cars = await Car.find(query);
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function addCar(req, res) {
    try {
        const newCar = await CarModel.add(req.body);
        return res.status(201).json({
            message: "Car added successfully",
            data: newCar
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function updateCar(req, res) {
    try {
        const updatedCar = await CarModel.update(req.params.id, req.body);

        if (!updatedCar) {
            return res.status(404).json({
                error: "Car not found or invalid ID"
            });
        }

        return res.status(200).json({
            message: "Car updated successfully",
            data: updatedCar
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteCar(req, res) {
    try {
        const deletedCar = await CarModel.del(req.params.id);

        if (!deletedCar) {
            return res.status(404).json({
                error: "Car not found or invalid ID"
            });
        }

        return res.status(200).json({
            message: "Car deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getDashboardStats(req, res) {
    try {
        const totalCars = await Car.countDocuments();
        const rentedCount = await Car.countDocuments({ available: false });

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        const revenueAgg = await booking.aggregate([
            {
                $match: {
                    status: "Booked",
                    startDate: { $gte: startOfMonth, $lte: endOfMonth }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalCost" }
                }
            }
        ]);

        const revenueThisMonth = revenueAgg[0]?.totalRevenue || 0;

        return res.status(200).json({
            totalCars,
            rentedCount,
            revenueThisMonth
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}