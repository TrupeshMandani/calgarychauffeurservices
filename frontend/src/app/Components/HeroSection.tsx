/**
 * The HeroSection component in this TypeScript React code displays a premium car rental service with a
 * background image of a luxury car and a call-to-action button to browse cars.
 * @returns The HeroSection component is being returned, which is a React functional component
 * displaying a hero section for a premium car rental service website. The component includes a
 * heading, description, and a button to browse cars, along with an image of a luxury car.
 */
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Flex container for positioning */}
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl mr-7 lg:w-full lg:pb-28 xl:pb-32 w-full">
          <main className="flex flex-col mt-10">
            <div className="sm:text-center lg:text-left mr-7">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Premium Car Rental</span>
                <span className="block text-blue-600">For Your Journey</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Experience luxury and comfort with our premium car rental
                service. Choose from our wide range of vehicles for your perfect
                journey.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/Vehicles"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Cars
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury car"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
