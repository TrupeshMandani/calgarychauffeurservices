import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">LuxeRide</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Vehicles
            </a>
            <a href="BookingPage" className="text-gray-700 hover:text-blue-600">
              Services
            </a>
            <a href="/AboutUs" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="/ContactUs" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
            <a  href="/BookingPage" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
              Book Now
            </a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
