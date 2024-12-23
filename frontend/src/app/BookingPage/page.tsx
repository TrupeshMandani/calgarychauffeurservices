"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import Link from "next/link";

const GOOGLE_MAPS_API_KEY = "AIzaSyBoTWqBLxUZU1wKFJIsVJjjgKPxixwIeDI";

const BookingPage = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  const autocompleteRefPickup = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const autocompleteRefDropoff = useRef<google.maps.places.Autocomplete | null>(
    null
  );

  const handlePickupLocationChange = () => {
    const place = autocompleteRefPickup.current?.getPlace();
    if (place && place.formatted_address) {
      setPickupLocation(place.formatted_address);
    }
  };

  const handleDropoffLocationChange = () => {
    const place = autocompleteRefDropoff.current?.getPlace();
    if (place && place.formatted_address) {
      setDropoffLocation(place.formatted_address);
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/carbg3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="container mx-auto p-4 relative z-10 flex justify-between h-full items-center">
          {/* Animated Text on Left Side */}
          <div className="max-w-md text-white space-y-6 animate-fadeIn hidden lg:block">
            <h1 className="text-5xl font-bold animate-bounce">
              Your Journey Begins Here
            </h1>
            <p className="text-lg">
              Book your ride effortlessly and explore new destinations with
              Lucky Car Booking.
            </p>
          </div>

          {/* Booking Form on Right Side */}
          <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-600">
              Calgary Chauffeur Service
            </h1>

            <Card>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pickup Location */}
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <Autocomplete
                        onLoad={(autocomplete) =>
                          (autocompleteRefPickup.current = autocomplete)
                        }
                        onPlaceChanged={handlePickupLocationChange}
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
                    {/* Drop-off Location */}
                    <div className="space-y-2">
                      <Label htmlFor="dropoff">Drop-off Location</Label>
                      <Autocomplete
                        onLoad={(autocomplete) =>
                          (autocompleteRefDropoff.current = autocomplete)
                        }
                        onPlaceChanged={handleDropoffLocationChange}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pickup Date */}
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
                    {/* Pickup Time */}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Drop-off Date */}
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
                    {/* Drop-off Time */}
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

                  <div className="pt-4">
                    <Link href="/Vehicles">
                      <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2"
                      >
                        Search Available Cars
                      </Button>
                    </Link>
                  </div>
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
