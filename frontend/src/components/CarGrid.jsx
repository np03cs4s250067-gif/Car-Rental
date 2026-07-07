import { useState } from "react";
import CarCard from "./CarCard";
import Button from "./Button";
import BookingModal from "./BookingModal";
import { useNavigate } from "react-router-dom";

export default function CarGrid({
  cars,
  setCars,
  bookings,
  setBookings,
}) {
  const navigate = useNavigate();

  const [selectedCar, setSelectedCar] = useState(null);
  const [filter, setFilter] = useState("All");

  function handleBook(car) {
    setSelectedCar(car);
  }

  function handleClick() {
    navigate("/add");
  }

  function confirmBooking(startDate, endDate, totalCost) {
    if (!selectedCar) return;

    const booking = {
      bookingId: Date.now(),
      carId: selectedCar.id,
      carModel: selectedCar.model,
      startDate,
      endDate,
      totalCost,
    };

    setBookings((prev) => [...prev, booking]);

    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === selectedCar.id
          ? { ...car, available: false }
          : car
      )
    );

    setSelectedCar(null);
  }

  const filteredCars =
    filter === "All"
      ? cars
      : cars.filter((car) => car.type === filter);

  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={handleClick}>
          + Add New Car
        </Button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border"
        >
          <option>All</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Hatchback</option>
          <option>Sports</option>
          <option>Electric</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {filteredCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onBook={handleBook}
          />
        ))}
      </div>

      {selectedCar && (
        <BookingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onConfirm={confirmBooking}
        />
      )}
    </>
  );
}