"use client"; // Required if using Next.js with client-side components
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, slideInFromLeft } from "../_utils/motion"; // Import animations

const HeroSection: React.FC = () => {
  return (
    <motion.div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/calgary.jpg')",
      }}
      initial="hidden" // Initial state for the image
      animate="visible" // Final state for the image
      variants={fadeIn} // Use the fadeIn animation
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8">
        {/* Text Content */}
        <motion.p
          initial="hidden" // Initial state for the text
          animate="visible" // Final state for the text
          variants={slideInFromLeft(0.5)} // Slide in with delay
          className="text-lg font-medium tracking-wide text-yellow-400 uppercase"
        >
          Reliable Drivers
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={slideInFromLeft(0.7)} // Add slight delay
          className="text-4xl font-extrabold sm:text-5xl md:text-6xl"
        >
          Luxury Chauffeur Services <br /> For Every Occasion
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={slideInFromLeft(0.9)} // Add further delay
          className="mt-4 text-lg sm:mt-6 sm:text-xl max-w-2xl"
        >
          Experience the best luxury transportation with our professional and
          trusted chauffeur services. Let us take care of your journey.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInFromLeft(1.1)} // Delay for button
          className="mt-6"
        >
          <a
            href="./BookingPage"
            className="px-8 py-3 font-medium text-black bg-yellow-400 rounded-md shadow hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
          >
            Explore More
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
