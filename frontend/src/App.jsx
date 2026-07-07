import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import CarGrid from "./components/CarGrid";
import AddCar from "./components/AddCar";
import MyBookings from "./components/MyBookings";

import car1 from "./assets/toyotaCorolla.jpeg";
import car2 from "./assets/hondaCivic.jpeg";
import car3 from "./assets/fordMustang.jpeg";
import car4 from "./assets/teslaModel3.jpeg";
import car5 from "./assets/jeepWrangler.jpeg";

export default function App() {
  const [cars, setCars] = useState([
    {
      id: 1,
      model: "Toyota Corolla",
      type: "Sedan",
      rate: 5000,
      available: true,
      image: car1,
    },
    {
      id: 2,
      model: "Honda Civic",
      type: "Sedan",
      rate: 5500,
      available: true,
      image: car2,
    },
    {
      id: 3,
      model: "Ford Mustang",
      type: "Sports",
      rate: 12000,
      available: false,
      image: car3,
    },
    {
      id: 4,
      model: "Tesla Model 3",
      type: "Electric",
      rate: 15000,
      available: true,
      image: car4,
    },
    {
      id: 5,
      model: "Jeep Wrangler",
      type: "SUV",
      rate: 9000,
      available: true,
      image: car5,
    },
  ]);

  const [bookings, setBookings] = useState([]);
  const [fleetValue, setFleetValue] = useState(0);
  const [rentedCount, setRentedCount] = useState(0);

  useEffect(() => {
    setFleetValue(cars.reduce((sum, car) => sum + car.rate, 0));
    setRentedCount(cars.filter((car) => !car.available).length);
  }, [cars]);

  useEffect(() => {
    const availableCars = cars.filter((car) => car.available).length;
    document.title = `Car Rental - ${availableCars} Cars`;
  }, [cars]);

  function addNewCar(newCar) {
    setCars((prevCars) => [...prevCars, newCar]);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F7FF] text-[#1F2937]">
        <Navbar />
        <Title />

        <div className="flex justify-center gap-6 mb-8">
          <div className="bg-white px-6 py-4 rounded-xl shadow">
            <h3 className="font-bold text-lg">Fleet Value</h3>
            <p className="text-[#4F86FF] text-xl font-bold">
              Rs. {fleetValue}
            </p>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl shadow">
            <h3 className="font-bold text-lg">Rented Cars</h3>
            <p className="text-red-500 text-xl font-bold">
              {rentedCount}
            </p>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <CarGrid
                cars={cars}
                setCars={setCars}
                bookings={bookings}
                setBookings={setBookings}
              />
            }
          />

          <Route
            path="/add"
            element={<AddCar onAddCar={addNewCar} />}
          />

          <Route
            path="/bookings"
            element={
              <MyBookings
                bookings={bookings}
                setBookings={setBookings}
                cars={cars}
                setCars={setCars}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Navbar() {
  return (
    <nav className="bg-[#2F3A4A] text-white px-8 py-4 flex gap-8 shadow-md">
      <Link to="/" className="hover:text-[#7AA7FF] transition duration-300">
        Browse Cars
      </Link>

      <Link
        to="/bookings"
        className="hover:text-[#7AA7FF] transition duration-300"
      >
        My Bookings
      </Link>

      <Link
        to="/add"
        className="hover:text-[#7AA7FF] transition duration-300"
      >
        Admin
      </Link>
    </nav>
  );
}

function Title() {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold text-[#1F2937]">
        Car Rental System
      </h1>
      <p className="text-[#6B7280] mt-2">Smooth rentals</p>
    </div>
  );
}