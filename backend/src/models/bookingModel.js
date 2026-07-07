import bookings from "../../data/bookings.js";

export function add(booking) {
    bookings.push(booking);
    return booking;
}

export function cancel(id) {
    const booking = bookings.find(b => b.id == id);

    if (!booking) {
        return false;
    }

    booking.status = "Cancelled";
    return true;
}