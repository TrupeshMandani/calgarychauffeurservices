"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CarCard from "./CarCard";
import "animate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface Car {
  description: string;
  name: string;
  type: string;
  price: string;
  img: string;
}

const FeaturedCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: introRef, inView: introInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: exploreRef, inView: exploreInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fetchCars = async () => {
    try {
      const response = await fetch("/chauffeurServices.cars.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch cars: ${response.statusText}`);
      }
      const data: Car[] = await response.json();
      setCars(data);
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

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center py-12 text-red-500">Error: {error}</p>;
  }

  return (
    <div ref={titleRef} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
        <div
          className={`text-center ${
            titleInView ? "animate__animated animate__fadeInDown" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Vehicles
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our fleet of premium vehicles tailored to meet your needs
            for comfort, style, and reliability.
          </p>
        </div>

        <div
          ref={introRef}
          className={`mt-8 text-center ${
            introInView ? "animate__animated animate__fadeInLeft" : "opacity-0"
          }`}
        >
          <p className="max-w-4xl mx-auto text-lg text-gray-600">
            Explore our carefully selected vehicles, each designed to provide
            the perfect balance of elegance and performance.
          </p>
        </div>

        <div className="mt-12">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {cars.map((car) => (
              <SwiperSlide key={car.name}>
                <div
                  className={`${
                    titleInView
                      ? "animate__animated animate__backInLeft"
                      : "opacity-0"
                  }`}
                  style={{
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          ref={exploreRef}
          className={`mt-12 text-center ${
            exploreInView
              ? "animate__animated animate__fadeInRight"
              : "opacity-0"
          }`}
        >
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Ready to make your reservation? Browse our fleet and book your
            perfect vehicle today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCars;
