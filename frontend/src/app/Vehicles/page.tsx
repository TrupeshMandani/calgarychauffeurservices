"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../_utils/Firebase"; // Ensure correct path to Firebase configuration

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CarCard from "../Components/CarCard";

const Page = () => {
  const router = useRouter();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p>Loading all cars...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Sort cars by their type
  const sortedCars = cars.sort((a, b) => a.type.localeCompare(b.type));

  // Group cars by type
  const groupedCars = sortedCars.reduce((acc, car) => {
    if (!acc[car.type]) {
      acc[car.type] = [];
    }
    acc[car.type].push(car);
    return acc;
  }, {} as Record<string, any[]>);

  const handleCarSelect = async (car: any) => {
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
        selectedVehicle: {
          name: car.name,
          type: car.type,
          price: car.price,
          img: car.img,
        },
      });

      console.log("Vehicle added to booking successfully!");
      // Navigate to the Payment Page
      router.push(`/PaymentPage?bookingId=${bookingId}`);
    } catch (error) {
      console.error("Error updating booking with selected vehicle: ", error);
      alert(
        "Failed to update booking with selected vehicle. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            All Vehicles
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse our entire collection of vehicles
          </p>
        </div>

        {/* Loop over each car type and display a Swiper for each type */}
        {Object.keys(groupedCars).map((carType, index) => (
          <div key={index} className="mb-12 relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{carType}</h3>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: `.swiper-button-next-${carType}`,
                prevEl: `.swiper-button-prev-${carType}`,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {groupedCars[carType].map(
                (
                  car: {
                    name: string;
                    type: string;
                    price: string;
                    img: string;
                  },
                  carIndex: React.Key | null | undefined
                ) => (
                  <SwiperSlide key={carIndex} className="pb-12">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleCarSelect(car)}
                    >
                      <CarCard
                        name={car.name}
                        type={car.type}
                        price={car.price}
                        img={car.img}
                        description={""}
                      />
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>

            {/* Navigation buttons outside the swiper */}
            <div
              className={`swiper-button-prev-${carType} absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-800 bg-white p-2 rounded-full shadow-lg z-10`}
            >
              {"<"}
            </div>
            <div
              className={`swiper-button-next-${carType} absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-800 bg-white p-2 rounded-full shadow-lg z-10`}
            >
              {">"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
