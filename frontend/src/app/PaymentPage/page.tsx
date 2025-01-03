'use client';

import { useSearchParams } from "next/navigation";
import CardForm from "../Components/CardForm";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Image from "next/image";

import { motion } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaTaxi, 
  FaCreditCard,
  FaCcVisa, 
  FaCcMastercard, 
  FaCcAmex 
} from "react-icons/fa";

export default function PaymentPage() {
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
    transition: { duration: 0.6 }
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
                      <strong className="text-gray-900">{formatLabel(key)}:</strong> {value}
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
              
              <motion.div 
                className="flex justify-center space-x-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-5xl text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <FaCcVisa />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-5xl text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <FaCcMastercard />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-5xl text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <FaCcAmex />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg p-6 shadow-inner"
              >
                <CardForm />
              </motion.div>

              <motion.div 
                className="mt-8 flex justify-center items-center gap-2 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FaCreditCard className="text-xl" />
                <span className="text-sm font-medium">Secure Payment by Square</span>
                <motion.div
                  className="w-4 h-4 bg-green-500 rounded-full ml-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
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
    case 'pickupLocation':
    case 'dropoffLocation':
      return <FaMapMarkerAlt className={className} />;
    case 'pickupDate':
      return <FaCalendarAlt className={className} />;
    case 'pickupTime':
      return <FaClock className={className} />;
    case 'distance':
    case 'duration':
      return <FaTaxi className={className} />;
    default:
      return null;
  }
}

function formatLabel(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
}

