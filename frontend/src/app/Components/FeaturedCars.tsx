"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer"; // Import useInView
import CarCard from "./CarCard"; // Import the CarCard component
import "animate.css"; // Import Animate.css

interface Car {
  description: string;
  name: string;
  type: string;
  price: string;
  img: string;
}

const FeaturedCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Percentage of component visibility to trigger
  });

  useEffect(() => {
    // Fetch cars data from the API
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) {
          throw new Error(`Failed to fetch cars: ${response.statusText}`);
        }
        const data: Car[] = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
        setCars(data);
        selectUniqueTypeCars(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Function to select 3 cars of different types
  const selectUniqueTypeCars = (cars: Car[]) => {
    const selectedCars: Car[] = [];
    const carTypes = new Set<string>();

    for (const car of cars) {
      if (!carTypes.has(car.type)) {
        selectedCars.push(car);
        carTypes.add(car.type);
      }
      if (selectedCars.length === 3) break;
    }

    setFeaturedCars(selectedCars);
  };

  if (loading) {
    return <p className="text-center py-12">Loading cars...</p>;
  }

  if (error) {
    return <p className="text-center py-12 text-red-500">Error: {error}</p>;
  }

  return (
    <div ref={ref} className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Vehicles
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Choose from our selection of premium vehicles
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car, index) => (
            <div
              key={car.name}
              className={`${
                inView ? "animate__animated animate__backInLeft" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 0.2}s`,
                transition: "opacity 0.5s ease-out",
              }}
            >
              <CarCard
                name={car.name}
                type={car.type}
                price={car.price}
                img={car.img}
                description={car.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCars;
