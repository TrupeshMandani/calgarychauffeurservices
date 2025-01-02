"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"; // Import Next.js router

const GOOGLE_MAPS_API_KEY = "AIzaSyBoTWqBLxUZU1wKFJIsVJjjgKPxixwIeDI";

export function BookingForm() {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  const autocompleteRefPickup = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const autocompleteRefDropoff = useRef<google.maps.places.Autocomplete | null>(
    null
  );

  const router = useRouter(); // Initialize Next.js router

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

  // Handle form submission with validation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    if (!pickupLocation || !dropoffLocation || !pickupDate || !pickupTime) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    // Navigate to the /vehicles page
    router.push("/Vehicles");
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
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
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="pickup"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-amber-500" /> Pickup
                    Location
                  </Label>
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
                      className="border-gray-300 mt-2"
                    />
                  </Autocomplete>
                </div>
                <div>
                  <Label
                    htmlFor="dropoff"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-amber-500" /> Drop-off
                    Location
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
                    <FaCalendarAlt className="text-amber-500" /> Pickup Date
                  </Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                    className="border-gray-300 mt-2"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="pickupTime"
                    className="text-gray-700 font-medium flex items-center gap-2"
                  >
                    <FaClock className="text-amber-500" /> Pickup Time
                  </Label>
                  <Input
                    id="pickupTime"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                    className="border-gray-300 mt-2"
                  />
                </div>
              </div>

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
