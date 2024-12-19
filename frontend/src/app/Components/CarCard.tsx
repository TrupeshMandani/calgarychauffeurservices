// src/app/Components/CarCard.tsx
"use client";

import { useRouter } from "next/navigation";

interface CarCardProps {
  name: string;
  type: string;
  price: string;
  img: string;
}

const CarCard: React.FC<CarCardProps> = ({ name, type, price, img }) => {
  const router = useRouter();

  const handleBookingClick = () => {
    router.push("/BookingPage");
  };

  return (
    <div className="car-card border p-4 rounded-lg shadow-lg">
      <img
        src={img}
        alt={name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-2">Type: {type}</p>
      <p className="text-lg font-bold mb-4">${price} per day</p>
      <button
        onClick={handleBookingClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default CarCard;
