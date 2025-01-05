"use client";
import React from "react";
import Atropos from "atropos/react";
import "atropos/css";

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
  return (
    <Atropos
      className="car-card relative bg-cream shadow-lg via-cream-200 border hover:shadow-2xl transition-transform transform hover:scale-105 rounded-md overflow-hidden"
      activeOffset={20} // Reduced offset for more stability
      shadow={false} // Disabled shadow for simplicity
      rotateXMax={10} // Reduced max rotation for X-axis
      rotateYMax={10} // Reduced max rotation for Y-axis
    >
      <img
        src={img}
        alt={name}
        className="w-full h-50 object-cover"
        data-atropos-offset="-2"
      />
      <div
        className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4"
        data-atropos-offset="2"
      >
        <h2
          className="text-xl font-bold text-white mb-1"
          data-atropos-offset="3"
        >
          {name}
        </h2>
        <p className="text-sm text-gray-200 mb-1" data-atropos-offset="2">
          Type: {type}
        </p>
        <p className="text-sm text-gray-200 mb-1" data-atropos-offset="1">
          {description}
        </p>
        <p className="text-lg font-semibold text-white" data-atropos-offset="1">
          ${price} per day
        </p>
      </div>
    </Atropos>
  );
};

export default CarCard;
