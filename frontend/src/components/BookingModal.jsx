import { useState, useEffect } from "react";

export default function BookingModal({
  car,
  onClose,
  onConfirm,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const diffInMs = end - start;
      const diffInDays = Math.ceil(
        diffInMs / (1000 * 60 * 60 * 24)
      );

      if (diffInDays > 0) {
        setTotalCost(diffInDays * car.rate);
      } else {
        setTotalCost(0);
      }
    }
  }, [startDate, endDate, car.rate]);

  function handleConfirm() {
    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    if (totalCost <= 0) {
      alert("End date must be after start date");
      return;
    }

    onConfirm(startDate, endDate, totalCost);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[420px]">
        <h2 className="text-2xl font-bold mb-4">
          Book {car.model}
        </h2>

        <p className="mb-4 text-gray-600">
          Daily Rate: Rs. {car.rate}
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div className="bg-[#F5F7FF] p-4 rounded-lg">
            <p className="font-semibold text-lg">
              Total Cost: Rs. {totalCost}
            </p>
          </div>

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleConfirm}
              className="flex-1 bg-[#4F86FF] text-white py-3 rounded-lg font-medium hover:bg-[#3B73F0]"
            >
              Confirm Booking
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}