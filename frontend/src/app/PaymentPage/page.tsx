
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import CardForm from "../Components/CardForm";
import LogInPage from "../Components/LogInPage"; // Import LogInPage component
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTaxi } from "react-icons/fa";

export default function PaymentPage() {
  const [showComponent, setShowComponent] = useState<
    "none" | "login" | "guest"
  >("none");
  const searchParams = useSearchParams();

  const bookingInfo = {
    pickupLocation: searchParams?.get("pickupLocation") || "N/A",
    dropoffLocation: searchParams?.get("dropoffLocation") || "N/A",
    pickupDate: searchParams?.get("pickupDate") || "N/A",
    pickupTime: searchParams?.get("pickupTime") || "N/A",
    distance: searchParams?.get("distance") || "N/A",
    duration: searchParams?.get("duration") || "N/A",
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

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
                {Object.entries(bookingInfo).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="flex items-center gap-4 text-gray-800 hover:text-gray-950 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {getIcon(key)}
                    <p>
                      <strong className="text-gray-900">
                        {formatLabel(key)}:
                      </strong>{" "}
                      {value}
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
              <motion.h2
                className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2"
                {...fadeInUp}
              >
                Complete Your Payment
              </motion.h2>

              {/* Buttons for Sign In and As a Guest */}
              {/* Buttons for Sign In and As a Guest */}
              <motion.div
                className="mb-6 flex flex-col items-center gap-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Sign In Section */}
                <p className="text-lg font-semibold text-gray-700">
                  Please <span className="text-blue-600">Log In</span> to your
                  account
                </p>
                <button
                  onClick={() => setShowComponent("login")}
                  className="w-2/3 lg:w-1/2 px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                >
                  Log In
                </button>
                

                {/* Divider */}
                <p className="text-sm text-gray-600 my-2">or</p>

                {/* Guest Section */}
                <p className="text-lg font-semibold text-gray-700">
                  <span className="text-blue-600">Continue as guest</span> to
                  book your reservation
                </p>
                <button
                  onClick={() => setShowComponent("guest")}
                  className="w-2/3 lg:w-1/2 px-6 py-2 font-semibold text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                >
                  Continue as Guest
                </button>
              </motion.div>

              {/* Conditional Rendering of Components */}
              {showComponent === "login" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <LogInPage />
                </motion.div>
              )}

              {showComponent === "guest" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <CardForm />
                </motion.div>
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
