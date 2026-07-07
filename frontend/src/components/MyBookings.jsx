export default function MyBookings({
    bookings,
    setBookings,
    cars,
    setCars,
  }) {
    function cancelBooking(bookingId, carId) {
      setBookings(
        bookings.filter(
          (booking) => booking.bookingId !== bookingId
        )
      );
  
      setCars(
        cars.map((car) =>
          car.id === carId
            ? { ...car, available: true }
            : car
        )
      );
    }
  
    if (bookings.length === 0) {
      return (
        <div className="text-center mt-12 text-gray-500 text-xl">
          No bookings yet.
        </div>
      );
    }
  
    return (
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <h2 className="text-3xl font-bold mb-6">
          My Bookings
        </h2>
  
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white rounded-xl shadow border p-6"
            >
              <h3 className="text-2xl font-bold mb-2">
                {booking.carModel}
              </h3>
  
              <p className="text-gray-600">
                Start Date: {booking.startDate}
              </p>
  
              <p className="text-gray-600">
                End Date: {booking.endDate}
              </p>
  
              <p className="text-[#4F86FF] font-bold text-xl mt-3">
                Total: Rs. {booking.totalCost}
              </p>
  
              <button
                onClick={() =>
                  cancelBooking(
                    booking.bookingId,
                    booking.carId
                  )
                }
                className="mt-4 bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }