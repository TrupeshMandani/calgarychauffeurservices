"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  DirectionsRenderer,
  Libraries,
} from "@react-google-maps/api";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const GOOGLE_MAPS_API_KEY = "AIzaSyBoTWqBLxUZU1wKFJIsVJjjgKPxixwIeDI";
const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];

export function BookingForm() {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [error, setError] = useState("");

  const [pickupCoords, setPickupCoords] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [dropoffCoords, setDropoffCoords] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const autocompleteRefPickup = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const autocompleteRefDropoff = useRef<google.maps.places.Autocomplete | null>(
    null
  );

  const router = useRouter();

  const getCurrentDateTime = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentDate = now.toISOString().split("T")[0];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    return {
      date: currentDate,
      hour: currentHour,
      minute: currentMinute,
      year: currentYear,
    };
  };

  const handlePickupLocationChange = () => {
    const place = autocompleteRefPickup.current?.getPlace();
    if (place) {
      setPickupLocation(place.formatted_address || "");
      setPickupCoords(place.geometry?.location?.toJSON() || null);
      setError("");
    }
    setDirections(null);
  };

  const handleDropoffLocationChange = () => {
    const place = autocompleteRefDropoff.current?.getPlace();
    if (place) {
      setDropoffLocation(place.formatted_address || "");
      setDropoffCoords(place.geometry?.location?.toJSON() || null);
      setError("");
    }
    setDirections(null);
  };

  const validateDateTime = () => {
    const now = new Date();
    const selectedDateTime = new Date(`${pickupDate}T${pickupTime}`);

    if (selectedDateTime <= now) {
      setError("Please select a future date and time for your booking.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const calculateRoute = async () => {
      if (!pickupCoords || !dropoffCoords) return;

      const directionsService = new google.maps.DirectionsService();

      try {
        const result = await new Promise<google.maps.DirectionsResult>(
          (resolve, reject) => {
            directionsService.route(
              {
                origin: pickupCoords,
                destination: dropoffCoords,
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === google.maps.DirectionsStatus.OK && response) {
                  resolve(response);
                } else {
                  reject(status);
                }
              }
            );
          }
        );

        setDirections(result);
        const leg = result.routes[0]?.legs[0];
        if (leg) {
          setDistance(leg.distance?.text || "N/A");
          setDuration(leg.duration?.text || "N/A");
        }
        setError("");
      } catch (status) {
        console.error("Directions request failed:", status);
        setError(
          "Unable to calculate route. Please check the addresses and try again."
        );
        setDirections(null);
        setDistance("");
        setDuration("");
      }
    };

    calculateRoute();
  }, [pickupCoords, dropoffCoords]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!pickupCoords || !dropoffCoords || !pickupDate || !pickupTime) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    if (!validateDateTime()) {
      return;
    }

    router.push("/Vehicles");
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
    >
      <motion.div
        className="max-w-4xl mx-auto -mt-20 relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
      >
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
              Book Your Ride
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="pickup"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-black" /> Pickup Location
                  </Label>
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRefPickup.current = autocomplete)
                    }
                    onPlaceChanged={handlePickupLocationChange}
                    options={{ types: ["address"] }}
                  >
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                      className="border-gray-300 mt-2"
                    />
                  </Autocomplete>
                </div>
                <div>
                  <Label
                    htmlFor="dropoff"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-black" /> Drop-off Location
                  </Label>
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRefDropoff.current = autocomplete)
                    }
                    onPlaceChanged={handleDropoffLocationChange}
                    options={{ types: ["address"] }}
                  >
                    <Input
                      id="dropoff"
                      placeholder="Enter drop-off location"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      required
                      className="border-gray-300 mt-2"
                    />
                  </Autocomplete>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="pickupDate"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <FaCalendarAlt className="text-black" /> Pickup Date
                  </Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={getCurrentDateTime().date}
                    required
                    className="border-gray-300 mt-2"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="pickupTime"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <FaClock className="text-black" /> Pickup Time
                  </Label>
                  <Input
                    id="pickupTime"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    min={
                      pickupDate === getCurrentDateTime().date
                        ? `${getCurrentDateTime().hour}:${
                            getCurrentDateTime().minute
                          }`
                        : undefined
                    }
                    required
                    className="border-gray-300 mt-2"
                  />
                </div>
              </div>

              {directions && (
                <div className="mt-8">
                  <GoogleMap
                    mapContainerStyle={{
                      height: "400px",
                      width: "100%",
                    }}
                    zoom={10}
                    center={pickupCoords || { lat: 0, lng: 0 }}
                  >
                    <DirectionsRenderer directions={directions} />
                  </GoogleMap>
                  <div className="mt-4 text-gray-700">
                    <p>
                      <strong>Distance:</strong> {distance}
                    </p>
                    <p>
                      <strong>Duration:</strong> {duration}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 flex items-center justify-center gap-2"
                >
                  <FaCar className="text-lg" /> Book Taxi Now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </LoadScript>
  );
}
