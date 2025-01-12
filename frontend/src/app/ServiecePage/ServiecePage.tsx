"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion
import "animate.css"; // Import Animate.css
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import services from "./ServicesData"; // Import the services data from a separate file

import { useRouter } from "next/navigation"; // Import useRouter

const ServicesPage = () => {
  // Animation Variants for Framer Motion
  const router = useRouter();

  const textAnimationLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const textAnimationRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh] animate__animated animate__fadeInDown"
        style={{
          backgroundImage: "url('/MainCity.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={textAnimationLeft}
            className="text-5xl font-extrabold mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={textAnimationRight}
            className="text-xl max-w-2xl px-4"
          >
            Experience luxury and comfort with our premium chauffeur services
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      {services.map((service, index) => (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`py-20 ${
            index % 2 === 1
              ? "bg-gray-200 mx-28 animate__animated animate__fadeInLeft"
              : "bg-white animate__animated animate__fadeInRight"
          }`}
          key={index}
        >
          <div
            className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } gap-12`}
          >
            {/* Text Content */}
            <motion.div
              className="md:w-1/2 flex flex-col justify-center space-y-6"
              variants={
                index % 2 === 1 ? textAnimationRight : textAnimationLeft
              }
            >
              <h2 className="text-4xl font-bold text-gray-800">
                {service.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <div>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 font-medium text-black bg-yellow-400 rounded-md shadow hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
                  onClick={() => router.push("/BookingPage")} // Navigate to /BookingPage
                >
                  Book Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
            {/* Images */}
            <motion.div
              className="md:w-1/2 flex justify-center items-center"
              variants={imageAnimation}
            >
              <div className="grid grid-cols-2 gap-6">
                {service.images.map((image, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={image}
                    alt={`${service.title} ${imgIndex + 1}`}
                    width={400}
                    height={250}
                    className="rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default ServicesPage;
