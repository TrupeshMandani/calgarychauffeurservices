import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/calgary.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8">
        <p className="text-lg font-medium tracking-wide text-yellow-400 uppercase">
          Reliable Drivers
        </p>
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          Luxury Chauffeur Services <br /> For Every Occasion
        </h1>
        <p className="mt-4 text-lg sm:mt-6 sm:text-xl max-w-2xl">
          Experience the best luxury transportation with our professional and
          trusted chauffeur services. Let us take care of your journey.
        </p>
        <div className="mt-6">
          <a
            href="/book"
            className="px-8 py-3 font-medium text-black bg-yellow-400 rounded-md shadow hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
          >
            Explore More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
