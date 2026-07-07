import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCar({ onAddCar }) {
  const [carModel, setCarModel] = useState("");
  const [carType, setCarType] = useState("");
  const [carRate, setCarRate] = useState("");
  const [carImage, setCarImage] = useState(null);
  const [carAvailable, setCarAvailable] = useState(true);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!carModel || !carType || !carRate) {
      alert("Please fill all required fields");
      return;
    }

    const newCar = {
      id: Date.now(),
      model: carModel,
      type: carType,
      rate: Number(carRate),
      available: carAvailable,
      image: carImage
        ? URL.createObjectURL(carImage)
        : "https://via.placeholder.com/300",
    };

    onAddCar(newCar);
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border border-[#E5E7EB]">
      <h2 className="text-2xl font-bold mb-4 text-[#1F2937]">
        Add New Car
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Car Model"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7AA7FF]"
        />

        <input
          type="text"
          placeholder="Car Type (SUV, Sedan...)"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7AA7FF]"
        />

        <input
          type="number"
          placeholder="Daily Rate"
          value={carRate}
          onChange={(e) => setCarRate(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7AA7FF]"
        />

        <input
          type="file"
          onChange={(e) => setCarImage(e.target.files[0])}
          className="p-3 border rounded-lg"
        />

        <select
          value={carAvailable}
          onChange={(e) => setCarAvailable(e.target.value === "true")}
          className="p-3 border rounded-lg"
        >
          <option value={true}>Available</option>
          <option value={false}>Rented</option>
        </select>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-[#4F86FF] text-white py-3 rounded-lg font-medium hover:bg-[#3B73F0] transition"
          >
            Add Car
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}