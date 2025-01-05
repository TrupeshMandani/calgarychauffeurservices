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
import { FaMapMarkerAlt, FaCar, FaClock, FaCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const GOOGLE_MAPS_API_KEY = "AIzaSyBoTWqBLxUZU1wKFJIsVJjjgKPxixwIeDI";
const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];

export function BookingForm() {
  const [pickupDate, setPickupDate] = useState(dayjs());
  const [pickupTime, setPickupTime] = useState(dayjs());
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

  // Save form data to local storage
  const saveToLocalStorage = () => {
    const formData = {
      pickupDate: pickupDate.format("YYYY-MM-DD"),
      pickupTime: pickupTime.format("HH:mm"),
      pickupLocation,
      dropoffLocation,
      distance,
      duration,
    };
    localStorage.setItem("bookingFormData", JSON.stringify(formData));
  };

  // Load form data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem("bookingFormData");
    if (savedData) {
      const {
        pickupDate,
        pickupTime,
        pickupLocation,
        dropoffLocation,
        distance,
        duration,
      } = JSON.parse(savedData);

      setPickupDate(dayjs(pickupDate));
      setPickupTime(dayjs(pickupTime));
      setPickupLocation(pickupLocation);
      setDropoffLocation(dropoffLocation);
      setDistance(distance || "");
      setDuration(duration || "");
    }
  }, []);

  const handlePickupLocationChange = () => {
    const place = autocompleteRefPickup.current?.getPlace();
    if (place) {
      setPickupLocation(place.formatted_address || "");
      setPickupCoords(place.geometry?.location?.toJSON() || null);
      setError("");
    }
    setDirections(null);
    saveToLocalStorage();
  };

  const handleDropoffLocationChange = () => {
    const place = autocompleteRefDropoff.current?.getPlace();
    if (place) {
      setDropoffLocation(place.formatted_address || "");
      setDropoffCoords(place.geometry?.location?.toJSON() || null);
      setError("");
    }
    setDirections(null);
    saveToLocalStorage();
  };

  const validateDateTime = () => {
    const now = dayjs();
    const selectedDateTime = pickupDate
      .hour(pickupTime.hour())
      .minute(pickupTime.minute());

    if (selectedDateTime.isBefore(now)) {
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
        saveToLocalStorage();
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

    if (!pickupCoords || !dropoffCoords || !pickupDate || !pickupTime) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    if (!validateDateTime()) {
      return;
    }

    saveToLocalStorage();

    const queryParams = new URLSearchParams({
      pickupLocation,
      dropoffLocation,
      pickupDate: pickupDate.format("YYYY-MM-DD"),
      pickupTime: pickupTime.format("HH:mm"),
      distance,
      duration,
    }).toString();

    router.push(`/Vehicles?${queryParams}`);
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
                    className="text-gray-700 font-medium mb-2 flex items-center gap-2"
                  >
                    <FaCalendarAlt className="text-black" />
                    Pickup Date
                  </Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={pickupDate}
                      onChange={(newValue) =>
                        setPickupDate(newValue || dayjs())
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <Label
                    htmlFor="pickupTime"
                    className="text-gray-700 mb-2 font-medium flex items-center gap-2"
                  >
                    <FaClock className="text-black" /> Pickup Time
                  </Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={pickupTime}
                      onChange={(newValue) =>
                        setPickupTime(newValue || dayjs())
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
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
