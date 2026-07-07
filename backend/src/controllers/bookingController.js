import * as BookingModel from "../models/bookingModel.js";

let nextBookingId = 1;

export function addBooking(req, res) {

    const booking = {
        id: nextBookingId++,
        ...req.body,
        status: "Booked"
    };

    BookingModel.add(booking);

    res.status(201).json({
        message: "Booking created",
        data: booking
    });
}

export function cancelBooking(req, res) {

    const cancelled = BookingModel.cancel(req.params.id);

    if (!cancelled) {
        return res.status(404).json({
            error: "Booking not found"
        });
    }

    res.json({
        message: "Booking cancelled"
    });
}