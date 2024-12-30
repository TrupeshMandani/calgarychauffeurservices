import React from "react";
import ServiceCard from "../Components/ServiceCard";
import services from "./ServicesData";

const ServicesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: "url('/images/hero-services.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-extrabold mb-4">Our Services</h1>
          <p className="text-lg max-w-2xl">
            Discover our range of luxury chauffeur services tailored to your
            needs.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
            Explore Our Services
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

      {/* Call to Action */}
      <section className="py-16 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to Experience Luxury?
          </h2>
          <p className="text-lg text-white mt-4">
            Book your chauffeur service today and travel in style.
          </p>
          <a
            href="/BookingPage"
            className="mt-6 inline-block bg-white text-yellow-400 px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors duration-300"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
