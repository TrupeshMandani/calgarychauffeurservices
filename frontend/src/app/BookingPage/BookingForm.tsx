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
import {
  FaMapMarkerAlt,
  FaCar,
  FaClock,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../_utils/Firebase";

const GOOGLE_MAPS_API_KEY = "AIzaSyBoTWqBLxUZU1wKFJIsVJjjgKPxixwIeDI";
const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];

export function BookingForm() {
  const [pickupDate, setPickupDate] = useState(dayjs());
  const [pickupTime, setPickupTime] = useState(dayjs());
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  const saveBookingToFirestore = async () => {
    const bookingData = {
      pickupDate: pickupDate.format("YYYY-MM-DD"),
      pickupTime: pickupTime.format("HH:mm"),
      pickupLocation,
      dropoffLocation,
      distance,
      duration,
    };

    try {
      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      return docRef.id;
    } catch (error) {
      if (error instanceof Error) {
        setError(`Failed to save booking. Error: ${error.message}`);
      } else {
        setError("Failed to save booking. An unknown error occurred.");
      }
      return null;
    }
  };

  const validateForm = () => {
    if (!pickupCoords || !dropoffCoords) {
      setError("Please select valid pickup and drop-off locations.");
      return false;
    }

    const now = dayjs();
    const selectedDateTime = pickupDate
      .hour(pickupTime.hour())
      .minute(pickupTime.minute());

    if (selectedDateTime.isBefore(now)) {
      setError("Please select a time at least 2 hours from now.");
      return false;
    }

    setError(null); // Clear error if everything is valid
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields explicitly
    if (!pickupLocation.trim() || !dropoffLocation.trim()) {
      setError("Pickup and Drop-off locations cannot be empty.");
      return;
    }

    // Validate coordinates and date/time
    if (!validateForm()) {
      return;
    }

    const bookingId = await saveBookingToFirestore();
    if (bookingId) {
      router.push(`/Vehicles?bookingId=${bookingId}`);
    }
  };

  const handlePickupLocationChange = () => {
    const place = autocompleteRefPickup.current?.getPlace();
    if (place?.formatted_address && place.geometry?.location) {
      setPickupLocation(place.formatted_address);
      setPickupCoords(place.geometry.location.toJSON());
      setError(null); // Clear error
    }
  };

  const handleDropoffLocationChange = () => {
    const place = autocompleteRefDropoff.current?.getPlace();
    if (place?.formatted_address && place.geometry?.location) {
      setDropoffLocation(place.formatted_address);
      setDropoffCoords(place.geometry.location.toJSON());
      setError(null); // Clear error
    }
  };

  useEffect(() => {
    const calculateRoute = async () => {
      if (!pickupCoords || !dropoffCoords) return;

      console.log("Calculating Route:", { pickupCoords, dropoffCoords }); // Debug log

      const directionsService = new google.maps.DirectionsService();

      try {
        const result = await directionsService.route({
          origin: pickupCoords,
          destination: dropoffCoords,
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirections(result);

        const leg = result.routes[0]?.legs[0];
        if (leg) {
          setDistance(leg.distance?.text || "N/A");
          setDuration(leg.duration?.text || "N/A");
          setError(null); // Clear error on successful route calculation
        }
      } catch (err) {
        console.error("Route Calculation Error:", err); // Debug log
        setError("Unable to calculate route. Please check the addresses.");
      }
    };

    calculateRoute();
  }, [pickupCoords, dropoffCoords]);

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
              <motion.div
                className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex justify-between items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span>{error}</span>
                <button
                  className="text-xl"
                  onClick={() => setError(null)}
                  aria-label="Dismiss error"
                >
                  <FaTimes />
                </button>
              </motion.div>
            )}
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              {/* Form fields */}
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
