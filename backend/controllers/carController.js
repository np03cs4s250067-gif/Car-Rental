import * as FleetRepository from "../models/carModel.js";
import Vehicle from "../data/car.js";
import RentalBooking from "../data/booking.js";

export async function getCars(req, res) {
    try {
        const filterDate = req.query.date ? new Date(req.query.date) : null;
        const selectorQuery = {};

        if (filterDate) {
            // Find active bookings that overlap with requested date
            const conflictingBookings = await RentalBooking.find({
                status: "Booked",
                startDate: { $lte: filterDate },
                endDate: { $gte: filterDate }
            });
            const occupiedVehicleIds = conflictingBookings.map(item => item.carId);
            selectorQuery._id = { $nin: occupiedVehicleIds };
        }

        const fleetList = await Vehicle.find(selectorQuery);
        return res.status(200).json(fleetList);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function addCar(req, res) {
    try {
        const createdVehicle = await FleetRepository.add(req.body);
        return res.status(201).json({
            message: "Car added successfully",
            data: createdVehicle
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function updateCar(req, res) {
    try {
        const vehicleId = req.params.id;
        const modifiedVehicle = await FleetRepository.update(vehicleId, req.body);

        if (!modifiedVehicle) {
            return res.status(404).json({
                error: "Car not found or invalid ID"
            });
        }

        return res.status(200).json({
            message: "Car updated successfully",
            data: modifiedVehicle
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function deleteCar(req, res) {
    try {
        const targetId = req.params.id;
        const removedVehicle = await FleetRepository.del(targetId);

        if (!removedVehicle) {
            return res.status(404).json({
                error: "Car not found or invalid ID"
            });
        }

        return res.status(200).json({
            message: "Car deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function getDashboardStats(req, res) {
    try {
        const totalCars = await Vehicle.countDocuments();
        const rentedCount = await Vehicle.countDocuments({ available: false });

        const currentDate = new Date();
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

        const revenueAggregation = await RentalBooking.aggregate([
            {
                $match: {
                    status: "Booked",
                    startDate: { $gte: monthStart, $lte: monthEnd }
                }
            },
            {
                $group: {
                    _id: null,
                    sumTotal: { $sum: "$totalCost" }
                }
            }
        ]);

        const revenueThisMonth = revenueAggregation[0]?.sumTotal || 0;

        return res.status(200).json({
            totalCars,
            rentedCount,
            revenueThisMonth
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}