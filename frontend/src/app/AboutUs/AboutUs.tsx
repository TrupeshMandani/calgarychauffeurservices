"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "animate.css";

const About = () => {
  useEffect(() => {
    console.log("Page loaded successfully.");
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2 } },
  };

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header
        className="relative bg-gray-900 text-white text-center py-20"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative py-2 z-10"
        >
          <h1 className="text-5xl font-bold">
            About Calgary Chauffeur Services
          </h1>
          <p className="text-xl mt-4">
            Your Trusted Partner in Luxury Transportation
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-gray-900 opacity-40 z-0"></div>
      </header>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0 }}
          variants={slideInFromLeft}
          className="flex flex-col justify-center space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-900">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Calgary Chauffeur Services, we provide top-notch chauffeur-driven
            car services tailored to meet the needs of both corporate and
            leisure travelers. With a commitment to excellence, we ensure that
            every ride with us is a memorable experience.
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to provide exceptional chauffeur services that
            prioritize safety, comfort, and punctuality. We strive to exceed
            expectations and set the standard for luxury transportation.
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
            <li>
              <strong>Professional Chauffeurs:</strong> Experienced and
              courteous drivers.
            </li>
            <li>
              <strong>Luxury Fleet:</strong> A range of premium sedans, SUVs,
              and limousines.
            </li>
            <li>
              <strong>Reliable & Punctual:</strong> Committed to timeliness for
              all trips.
            </li>
            <li>
              <strong>24/7 Availability:</strong> Always ready to serve your
              needs.
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0 }}
          variants={slideInFromRight}
          className="relative"
        >
          <Image
            src="/DALL·E 2025-01-10 16.14.29 - A stunning fleet of luxury vehicles including black sedans, SUVs, and limousines, parked elegantly in a modern setting. The vehicles are polished and .webp"
            alt="Fleet of Luxury Vehicles"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer
        className="relative bg-gray-900 text-white text-center py-10"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative z-10"
        >
          <p className="text-lg">
            Contact us today to book your next luxury ride with Calgary
            Chauffeur Services.
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-gray-900 opacity-40 z-0"></div>
      </footer>
    </div>
  );
};

export default About;
