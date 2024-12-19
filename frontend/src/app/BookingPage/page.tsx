"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import CarCard from "../Components/CarCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
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

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/car-background.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="container mx-auto p-4 relative z-10 flex justify-between h-full items-center">
          {/* Animated Text on Left Side */}
          <div className="max-w-md text-white space-y-6 animate-fadeIn">
            <h1 className="text-5xl font-bold animate-bounce">Your Journey Begins Here</h1>
            <p className="text-lg">
              Book your ride effortlessly and explore new destinations with Lucky Car Booking.
            </p>
          </div>

          {/* Booking Form on Right Side */}
          <div className="w-full max-w-2xl bg-white shadow-2xl rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
              Calgary Chauffeur Service
            </h1>

            <Card>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); fetchCars(); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <Autocomplete
                        onPlaceChanged={() =>
                          setPickupLocation(autocompleteRefPickup.current?.getPlace()?.formatted_address || "")
                        }
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
                        onPlaceChanged={() =>
                          setDropoffLocation(autocompleteRefDropoff.current?.getPlace()?.formatted_address || "")
                        }
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

                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Search Available Cars
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default BookingPage;
