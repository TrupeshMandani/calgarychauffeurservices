"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../_utils/Firebase"; // Ensure correct path to Firebase configuration
import CardForm from "../Components/CardForm";
import LogInPage from "../Components/LogInPage";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTaxi,
  FaCar,
} from "react-icons/fa";

// Define types for booking and vehicle information
interface BookingInfo {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  distance: string;
  duration: string;
}

interface Vehicle {
  name: string;
  type: string;
  price: string;
}

export default function PaymentPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [showComponent, setShowComponent] = useState<
    "none" | "login" | "guest"
  >("none");
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    pickupLocation: "N/A",
    dropoffLocation: "N/A",
    pickupDate: "N/A",
    pickupTime: "N/A",
    distance: "N/A",
    duration: "N/A",
  });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false after authentication check
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch booking data and selected vehicle from Firestore
    const fetchBookingDetails = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const bookingId = queryParams.get("bookingId");

      if (!bookingId) {
        console.error("No booking ID found in the URL");
        return;
      }

      try {
        const bookingDoc = doc(db, "bookings", bookingId);
        const bookingSnap = await getDoc(bookingDoc);

        if (bookingSnap.exists()) {
          const bookingData = bookingSnap.data();
          setBookingInfo({
            pickupLocation: bookingData.pickupLocation || "N/A",
            dropoffLocation: bookingData.dropoffLocation || "N/A",
            pickupDate: bookingData.pickupDate || "N/A",
            pickupTime: bookingData.pickupTime || "N/A",
            distance: bookingData.distance || "N/A",
            duration: bookingData.duration || "N/A",
          });

          setSelectedVehicle(bookingData.selectedVehicle || null);
        } else {
          console.error("No booking found with the given ID.");
        }
      } catch (error) {
        console.error("Error fetching booking details: ", error);
      }
    };

    fetchBookingDetails();
  }, []);

  if (loading) {
    // Display a loading state while checking authentication
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <NavBar />

      <main className="flex-grow py-8 px-4 mt-16">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Booking Information Section */}
            <motion.div
              className="w-full lg:w-1/2 bg-[#f0eae6] shadow-2xl rounded-lg p-8 border border-gray-200"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2"
                {...fadeInUp}
              >
                Booking Information
              </motion.h2>

              <div className="space-y-6">
                {/* Render Car Information First */}
                {selectedVehicle && (
                  <motion.div
                    className="flex items-center gap-4 text-gray-800 hover:text-gray-950 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <FaCar className="text-2xl text-amber-600" />
                    <div>
                      <p>
                        <strong className="text-gray-900">Vehicle:</strong>{" "}
                        {selectedVehicle.name || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        Type: {selectedVehicle.type || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        Price: {selectedVehicle.price || "N/A"}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Render Other Booking Information */}
                {Object.entries(bookingInfo).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="flex items-center gap-4 text-gray-800 hover:text-gray-950 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {getIcon(key)}
                    <p>
                      <strong className="text-gray-900">
                        {formatLabel(key)}:
                      </strong>{" "}
                      {String(value)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              className="w-full lg:w-1/2 bg-[#f0eae6] shadow-2xl rounded-lg p-8 border border-gray-200"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {user ? (
                <>
                  <motion.h2
                    className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2"
                    {...fadeInUp}
                  >
                    Complete Your Payment
                  </motion.h2>
                  <CardForm />
                </>
              ) : (
                <>
                  <motion.h2
                    className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2"
                    {...fadeInUp}
                  >
                    Log In or Continue as Guest
                  </motion.h2>
                  <motion.div
                    className="mb-6 flex flex-col items-center gap-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={() => setShowComponent("login")}
                      className="w-2/3 lg:w-1/2 px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                    >
                      Log In
                    </button>
                    <p className="text-sm text-gray-600 my-2">or</p>
                    <button
                      onClick={() => setShowComponent("guest")}
                      className="w-2/3 lg:w-1/2 px-6 py-2 font-semibold text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                    >
                      Continue as Guest
                    </button>
                  </motion.div>

                  {showComponent === "login" && <LogInPage />}
                  {showComponent === "guest" && <CardForm />}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function getIcon(key: string) {
  const className = "text-2xl text-amber-600";
  switch (key) {
    case "pickupLocation":
    case "dropoffLocation":
      return <FaMapMarkerAlt className={className} />;
    case "pickupDate":
      return <FaCalendarAlt className={className} />;
    case "pickupTime":
      return <FaClock className={className} />;
    case "distance":
    case "duration":
      return <FaTaxi className={className} />;
    default:
      return null;
  }
}

function formatLabel(key: string): string {
  return (
    key.charAt(0).toUpperCase() +
    key
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim()
  );
}
