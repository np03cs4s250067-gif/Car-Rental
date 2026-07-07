export default function CarCard({ car, onBook }) {
  return (
    <div className="w-96 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm p-6 hover:shadow-lg transition duration-300">
      {/* Image */}
      <div className="h-56 rounded-xl mb-5 overflow-hidden">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-[#1F2937]">
        {car.model}
      </h2>

      <p className="text-lg text-[#6B7280] mt-1">
        Type: {car.type}
      </p>

      {/* Price */}
      <p className="text-2xl font-bold text-[#4F86FF] mt-3">
        Rs. {car.rate}/day
      </p>

      {/* Availability Badge */}
      <div className="mt-4">
        {car.available ? (
          <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-[#E8F8F3] text-[#1F9D7A] border border-[#7DD3C0]">
            Available
          </span>
        ) : (
          <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-[#FDECEC] text-[#E54848] border border-[#FCA5A5]">
            Rented
          </span>
        )}
      </div>

      {/* Book Button */}
      <button
        disabled={!car.available}
        onClick={() => onBook(car)}
        className={`mt-5 w-full py-3 rounded-lg font-medium text-lg transition duration-300 shadow-sm ${
          car.available
            ? "bg-[#4F86FF] text-white hover:bg-[#3B73F0] hover:scale-[1.02]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {car.available ? "Book Now" : "Not Available"}
      </button>
    </div>
  );
}