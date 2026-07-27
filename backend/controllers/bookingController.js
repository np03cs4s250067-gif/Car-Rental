import * as BookingModel from "../models/bookingModel.js";
import Car from "../data/car.js";
import booking from "../data/booking.js";

export async function addBooking(req, res) {
    try {
        const { carId, startDate, endDate } = req.body;
        const userId = req.user._id;
        const customerName = req.user.name;

        if (!carId || !startDate || !endDate) {
            return res.status(400).json({ error: "Missing required fields: carId, startDate, endDate" });
        }

        // Find car to get the daily rate
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        // Verify car is available
        if (!car.available) {
            return res.status(400).json({ error: "Car is already rented" });
        }

        // Calculate days and totalCost
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInMs = end - start;
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays <= 0) {
            return res.status(400).json({ error: "End date must be after start date" });
        }

        const totalCost = diffInDays * car.rate;

        // Atomically set car availability to false
        const updatedCar = await Car.findOneAndUpdate(
            { _id: carId, available: true },
            { $set: { available: false } },
            { new: true }
        );

        if (!updatedCar) {
            return res.status(400).json({ error: "Car could not be booked (it might have just been rented by another user)" });
        }

        // Create booking
        try {
            const newBooking = await BookingModel.add({
                carId,
                userId,
                customerName: req.body.customerName || customerName,
                startDate,
                endDate,
                totalCost,
                status: "Booked"
            });

            return res.status(201).json({
                message: "Booking created successfully",
                data: newBooking
            });
        } catch (bookingError) {
            // Revert car availability if booking creation fails
            await Car.findByIdAndUpdate(carId, { $set: { available: true } });
            return res.status(400).json({ error: bookingError.message });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function cancelBooking(req, res) {
    try {
        const bookingId = req.params.id;

        // Find booking
        const existingBooking = await booking.findById(bookingId);
        if (!existingBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Check permission: customers can only cancel their own bookings
        if (req.user.role === 'customer' && existingBooking.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Forbidden: You cannot cancel someone else's booking" });
        }

        if (existingBooking.status === "Cancelled") {
            return res.status(400).json({ error: "Booking is already cancelled" });
        }

        // Cancel the booking in DB
        const cancelledBooking = await BookingModel.cancel(bookingId);

        // Update car availability back to true
        await Car.findByIdAndUpdate(existingBooking.carId, { $set: { available: true } });

        return res.status(200).json({
            message: "Booking cancelled successfully",
            data: cancelledBooking
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getBookings(req, res) {
    try {
        let bookings;
        if (req.user.role === 'customer') {
            bookings = await BookingModel.getByUser(req.user._id);
        } else {
            bookings = await BookingModel.getAll();
        }

        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}