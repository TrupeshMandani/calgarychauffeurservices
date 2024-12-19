// src/app/BookingPage.tsx
"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import CarCard from "../Components/CarCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const GOOGLE_MAPS_API_KEY = "AIzaSyBoTWqBLxUZU1wKFJIsVJjjgKPxixwIeDI" || "";

const BookingPage = () => {
  const [showCars, setShowCars] = useState(false);
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carTypeFilter, setCarTypeFilter] = useState<string>("All");

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  const autocompleteRefPickup = useRef<any>(null);
  const autocompleteRefDropoff = useRef<any>(null);

  // Fetch cars from the API
  const fetchCars = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cars");
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await response.json();
      setCars(data);
      setFilteredCars(data);
      setShowCars(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCars();
  };

  // Handle car type filter change
  const handleFilterChange = (type: string) => {
    setCarTypeFilter(type);
    if (type === "All") {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter((car) => car.type === type));
    }
  };

  // Get unique car types for filter options
  const carTypes = ["All", ...new Set(cars.map((car) => car.type))];

  // Handle pickup location change
  const handlePickupLocationChange = () => {
    if (
      autocompleteRefPickup.current &&
      typeof autocompleteRefPickup.current.getPlace === "function"
    ) {
      const place = autocompleteRefPickup.current.getPlace();
      if (place && place.formatted_address) {
        setPickupLocation(place.formatted_address);
      }
    }
  };

  // Handle dropoff location change
  const handleDropoffLocationChange = () => {
    if (
      autocompleteRefDropoff.current &&
      typeof autocompleteRefDropoff.current.getPlace === "function"
    ) {
      const place = autocompleteRefDropoff.current.getPlace();
      if (place && place.formatted_address) {
        setDropoffLocation(place.formatted_address);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Lucky Car Booking
        </h1>

        <Card className="mb-8">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Autocomplete
                    onPlaceChanged={handlePickupLocationChange}
                    ref={autocompleteRefPickup}
                  >
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                    />
                  </Autocomplete>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoff">Drop-off Location</Label>
                  <Autocomplete
                    onPlaceChanged={handleDropoffLocationChange}
                    ref={autocompleteRefDropoff}
                  >
                    <Input
                      id="dropoff"
                      placeholder="Enter drop-off location"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      required
                    />
                  </Autocomplete>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pickup Time</Label>
                  <Input
                    id="pickupTime"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dropoffDate">Drop-off Date</Label>
                  <Input
                    id="dropoffDate"
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoffTime">Drop-off Time</Label>
                  <Input
                    id="dropoffTime"
                    type="time"
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Search Available Cars
              </Button>
            </form>
          </CardContent>
        </Card>

        {loading && <p className="text-center">Loading cars...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {showCars && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Available Cars</h2>

            <div className="mb-6 flex space-x-4">
              {carTypes.map((type) => (
                <Button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={
                    carTypeFilter === type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }
                >
                  {type}
                </Button>
              ))}
            </div>

            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{ clickable: true }}
              navigation
              modules={[Pagination, Navigation]}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3, // Show 3 cards at a time
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              {filteredCars.map((car) => (
                <SwiperSlide key={car._id}>
                  <CarCard
                    name={car.name}
                    type={car.type}
                    price={car.price}
                    img={car.img}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default BookingPage;
