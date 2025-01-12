import React from "react";
import "animate.css"; // Import Animate.css for animations

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-gray-900 animate__animated animate__fadeInUp"
      style={{ animationDuration: "1s" }}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Separator Line */}
        <hr className="border-gray-700 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              About Chauffeur
            </h3>
            <p className="mt-4 text-gray-300 text-sm">
              Chauffeur offers premium car rentals for all your journey needs.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/ServiecePage"
                  className="text-gray-300 hover:text-yellow-500"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/ContactUs"
                  className="text-gray-300 hover:text-yellow-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="text-gray-300">123 Luxe Street, NY</li>
              <li className="text-gray-300">(123) 456-7890</li>
              <li className="text-gray-300">info@Chauffeur.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Chauffeur. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
