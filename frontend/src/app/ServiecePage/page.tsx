"use client";

import React from "react";
import ServiceCard from "../Components/ServiceCard";
import services from "./ServicesData";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const ServicesPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh]"
        style={{
          backgroundImage: "url('/path-to-your-image.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-extrabold mb-4">Wedding Events</h1>
          <p className="text-xl max-w-2xl">
            Alpha Chauffeurs offers luxurious transportation options to make
            your wedding day special.
          </p>
        </div>
      </section>

      {/* Wedding Events Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Wedding Events
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Alpha Chauffeurs offers a range of luxurious transportation
              options to make your wedding day even more special...
            </p>
            <Button variant="outline" size="lg">
              Book Now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/path-to-image-1.jpg"
              alt="Wedding event 1"
              width={300}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="/path-to-image-2.jpg"
              alt="Wedding event 2"
              width={300}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="/path-to-image-3.jpg"
              alt="Wedding event 3"
              width={300}
              height={200}
              className="col-span-2"
            />
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Premium Services
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </section>

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
