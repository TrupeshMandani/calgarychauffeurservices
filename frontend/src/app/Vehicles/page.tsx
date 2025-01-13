"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../_utils/Firebase";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CarCard from "../Components/CarCard";

// Define the Car interface
interface Car {
  name: string;
  type: string;
  price: string;
  img: string;
}

const Page = () => {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/chauffeurServices.cars.json");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data: Car[] = await response.json(); // Explicitly cast to Car[]
        setCars(data);
      } catch (err) {
        setError((err as Error).message); // Type assertion for the error object
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Loading all cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Sort cars by their type
  const sortedCars = cars.sort((a, b) => a.type.localeCompare(b.type));

  // Group cars by type
  const groupedCars = sortedCars.reduce<Record<string, Car[]>>((acc, car) => {
    if (!acc[car.type]) {
      acc[car.type] = [];
    }
    acc[car.type].push(car);
    return acc;
  }, {});

  const handleCarSelect = async (car: Car) => {
    const queryParams = new URLSearchParams(window.location.search); // Get booking details from URL
    const bookingId = queryParams.get("bookingId");

    if (!bookingId) {
      alert("No booking found with the given ID.");
      return;
    }

    try {
      // Update Firestore document with the selected vehicle data
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        selectedVehicle: car,
      });

      console.log("Vehicle added to booking successfully!");
      // Navigate to the Payment Page
      router.push(`/PaymentPage?bookingId=${bookingId}`);
    } catch (err) {
      console.error("Error updating booking with selected vehicle: ", err);
      alert(
        "Failed to update booking with selected vehicle. Please try again."
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 via-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
            Explore Our Vehicles
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 sm:mt-6">
            Select from our luxurious fleet for your next journey
          </p>
        </div>

        {/* Loop over each car type and display a Swiper for each type */}
        {Object.keys(groupedCars).map((carType, index) => (
          <section
            key={index}
            className={`py-16 ${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                {carType}
              </h3>
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                navigation={{
                  nextEl: `.swiper-button-next-${carType}`,
                  prevEl: `.swiper-button-prev-${carType}`,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2, spaceBetween: 30 },
                  1024: { slidesPerView: 3, spaceBetween: 40 },
                }}
              >
                {groupedCars[carType].map((car, carIndex) => (
                  <SwiperSlide key={carIndex} className="pb-16">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleCarSelect(car)}
                    >
                      <CarCard
                        name={car.name}
                        type={car.type}
                        price={car.price}
                        img={car.img}
                        description={`Enjoy a comfortable and stylish ride in our ${car.name}.`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation buttons */}
              <button
                className={`swiper-button-prev-${carType} absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-800 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-200`}
              >
                {"<"}
              </button>
              <button
                className={`swiper-button-next-${carType} absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-800 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-200`}
              >
                {">"}
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Page;
