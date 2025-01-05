"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface CarCardProps {
  name: string;
  type: string;
  price: string;
  img: string;
  description: string;
}

const CarCard: React.FC<CarCardProps> = ({
  name,
  type,
  price,
  img,
  description,
}) => {
  const router = useRouter();

  const handleBookingClick = () => {
    router.push("/PaymentPage");
  };

  return (
    <div className="car-card p-4 bg-cream  shadow-lg via-cream-200  border  hover:shadow-2xl transition-transform transform hover:scale-105">
      <img
        src={img}
        alt={name}
        className="w-full h-50 object-cover mb-4 rounded-md border border-gray-200"
      />
      <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-2">Type: {type}</p>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-lg font-semibold text-gray-900 mb-4">
        ${price} per day
      </p>
      <button
        onClick={handleBookingClick}
        className="w-full bg-yellow-400 text-gray-800 py-2 px-4 rounded hover:bg-yellow-500 transition-all duration-300"
      >
        Book Now
      </button>
    </div>
  );
};

export default CarCard;
