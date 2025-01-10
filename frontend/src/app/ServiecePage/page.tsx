"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const services = [
  {
    title: "Wedding Events",
    description:
      "Alpha Chauffeurs offers a range of luxurious transportation options to make your wedding day even more special...",
    images: [
      "/DALL·E 2025-01-10 15.07.18 - A luxury white car decorated with elegant ribbons and flowers, parked in front of a beautiful wedding venue with a bride and groom nearby. The setting.webp",
      "/DALL·E 2025-01-10 15.08.32 - A luxurious white car decorated with intricate floral arrangements and elegant ribbons, parked in front of a grand palace-style wedding venue with gol.webp",
    ],
  },
  {
    title: "Corporate Travel",
    description:
      "Tailored chauffeur services for executives and business professionals, ensuring reliability and professionalism...",
    images: [
      "/DALL·E 2025-01-10 15.09.56 - A sleek black luxury sedan parked in front of a modern corporate building with glass facades. A professional chauffeur in a suit holds the door open, .webp",
      "/DALL·E 2025-01-10 15.10.23 - An ultra-luxurious black limousine parked outside a towering modern corporate skyscraper with glass facades. A professional chauffeur in an elegant su.webp",
    ],
  },
  {
    title: "Airport Transfers",
    description:
      "Experience timely, reliable, and luxurious transportation to and from the airport with Alpha Chauffeurs...",
    images: [
      "/DALL·E 2025-01-10 15.12.04 - A sleek black luxury car parked at an airport terminal with a professional chauffeur in a suit standing by the car, ready to assist. The background fe.webp",
      "/DALL·E 2025-01-10 15.12.57 - A luxurious black sedan parked near a modern airport terminal with a clear view of airplanes on the runway. A professional chauffeur in a sharp suit s.webp",
    ],
  },
  {
    title: "Graduation ",
    description:
      "Make your Graduation events unforgettable with our luxury chauffeur services tailored for your needs...",
    images: [
      "/DALL·E 2025-01-10 15.15.14 - A luxurious black limousine decorated with celebratory ribbons and balloons, parked in front of a grand university building. A graduate in a cap and g.webp",
      "/DALL·E 2025-01-10 15.16.14 - A luxurious white stretch limousine parked in front of a grand university with intricate architectural details. The car is polished and decorated with.webp",
    ],
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh]"
        style={{
          backgroundImage: "url('/path-to-your-hero-image.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-extrabold mb-4">Our Services</h1>
          <p className="text-xl max-w-2xl">
            Experience luxury and comfort with our premium chauffeur services
          </p>
        </div>
      </section>

      {/* Services Section */}
      {services.map((service, index) => (
        <section className="py-16" key={index}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {service.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {service.description}
              </p>
              <Button variant="outline" size="lg">
                Book Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              {service.images.map((image, imgIndex) => (
                <Image
                  key={imgIndex}
                  src={image}
                  alt={`${service.title} ${imgIndex + 1}`}
                  width={300}
                  height={200}
                  className={`rounded-lg ${
                    service.images.length === 1 && "col-span-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action Section */}
      <section className="py-16 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-white mb-8">
            Book your chauffeur service today and travel in style.
          </p>
          <Button size="lg" variant="secondary">
            Book Now <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
