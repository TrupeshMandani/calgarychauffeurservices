"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import Link from "next/link";
import { Clock, MapPin, Users, Calendar, Crosshair } from 'lucide-react';
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

const GOOGLE_MAPS_API_KEY = "AIzaSyBoTWqBLxUZU1wKFJIsVJjjgKPxixwIeDI";

const BookingPage = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [passengers, setPassengers] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              setPickupLocation(data.results[0].formatted_address);
            }
          } catch (error) {
            console.error('Error getting address:', error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          <div
            className="relative min-h-[calc(100vh-64px)] bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/carbg3.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="container mx-auto px-4 pt-20 pb-8 relative z-10 flex justify-between items-center min-h-[calc(100vh-64px)]">
              {/* Animated Text on Left Side */}
              <div className="max-w-md text-white space-y-8 animate-fadeIn hidden lg:block">
                <h1 className="text-6xl font-bold animate-bounce">
                  Luxury at Your Service
                </h1>
                <p className="text-xl animate-pulse">
                  Experience unparalleled comfort and style with our premium chauffeur service.
                </p>
                <div className="space-y-6 animate-slideIn">
                  <p className="flex items-center text-lg">
                    <Clock className="w-6 h-6 mr-3" /> 24/7 Availability
                  </p>
                  <p className="flex items-center text-lg">
                    <Users className="w-6 h-6 mr-3" /> Professional Chauffeurs
                  </p>
                  <p className="flex items-center text-lg">
                    <MapPin className="w-6 h-6 mr-3" /> Customized Routes
                  </p>
                </div>
              </div>

              {/* Booking Form on Right Side */}
              <div className="w-full max-w-md bg-white/95 shadow-2xl rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
                  Premium Chauffeur Service
                </h1>

                <Card className="border-0 shadow-none">
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickup" className="text-gray-700 flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <MapPin className="w-5 h-5 mr-2" />
                              Pickup Location
                            </div>
                           
                          </Label>
                          <div className="relative">
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
                                className="bg-white border-gray-200 text-gray-900 placeholder-gray-400 pr-10"
                              />
                            </Autocomplete>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={getCurrentLocation}
                              disabled={isLoading}
                            >
                              <Crosshair className="h-4 w-4 text-black" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dropoff" className="text-gray-700 flex items-center text-sm">
                            <MapPin className="w-5 h-5 mr-2" />
                            Drop-off Location
                          </Label>
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
                              className="bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                            />
                          </Autocomplete>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupDate" className="text-gray-700 flex items-center text-sm">
                            <Calendar className="w-5 h-5 mr-2" />
                            Pickup Date
                          </Label>
                          <Input
                            id="pickupDate"
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            required
                            className="bg-white border-gray-200 text-gray-900 cursor-pointer"
                            onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickupTime" className="text-gray-700 flex items-center text-sm">
                            <Clock className="w-5 h-5 mr-2" />
                            Pickup Time
                          </Label>
                          <Input
                            id="pickupTime"
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            required
                            className="bg-white border-gray-200 text-gray-900 [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:text-gray-900"
                            style={{
                              colorScheme: 'light'
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passengers" className="text-gray-700 flex items-center text-sm">
                          <Users className="w-5 h-5 mr-2" />
                          Passengers
                        </Label>
                        <Input
                          id="passengers"
                          type="number"
                          placeholder="Number of passengers"
                          value={passengers}
                          onChange={(e) => setPassengers(e.target.value)}
                          required
                          min="1"
                          className="bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                        />
                      </div>

                      <Link href="/Vehicles" className="block w-full">
                        <Button
                          type="submit"
                          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black transition-colors duration-300 py-3 text-lg font-semibold"
                        >
                          Find Your Luxury Ride
                        </Button>
                      </Link>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </LoadScript>
  );
}

export default BookingPage;

