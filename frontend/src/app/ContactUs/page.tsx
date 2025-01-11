"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import "animate.css";

const ContactUs = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true });
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true });
  const { ref: mapRef, inView: mapInView } = useInView({ triggerOnce: true });

  return (
    <div className="bg-gradient-to-b from-gray-100 via-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className={`relative bg-cover bg-center h-[60vh] ${
          heroInView ? "animate__animated animate__fadeInDown" : "opacity-0"
        }`}
        ref={heroRef}
        style={{
          backgroundImage: "url('/wallpaperflare.com_wallpaper-6.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white max-w-3xl">
            Get in touch with Calgary Chauffeur Services for exceptional luxury
            transportation solutions. We’re here to assist you!
          </p>
        </div>
      </section>

      {/* Combined Information & Form Section */}
      <div
        ref={infoRef}
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-xl p-8 mt-12 px-6 lg:px-12 ${
          infoInView ? "animate__animated animate__fadeInLeft" : "opacity-0"
        }`}
      >
        {/* Contact Information */}
        <div className="bg-gray-900 text-white rounded-lg p-6 lg:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className="text-gray-300 mb-8">
              Say something to start a live chat!
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-yellow-400 text-black w-12 h-12 rounded-full">
                  📞
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-sm text-gray-300">+1012 3456 789</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-yellow-400 text-black w-12 h-12 rounded-full">
                  📧
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-sm text-gray-300">demo@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-yellow-400 text-black w-12 h-12 rounded-full">
                  📍
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-sm text-gray-300">
                    132 Dartmouth Street Boston, Massachusetts 02156, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            <button className="w-10 h-10 rounded-full bg-yellow-400 flex justify-center items-center hover:bg-yellow-500">
              <span className="text-black text-lg">🐦</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-yellow-400 flex justify-center items-center hover:bg-yellow-500">
              <span className="text-black text-lg">📸</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-yellow-400 flex justify-center items-center hover:bg-yellow-500">
              <span className="text-black text-lg">🎮</span>
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div
          ref={formRef}
          className={`rounded-lg p-6 lg:p-10 bg-gray-0 shadow-md ${
            formInView ? "animate__animated animate__fadeInRight" : "opacity-0"
          }`}
        >
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full mt-1 p-3 border border-gray-300 bg-white text-black rounded-md shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full mt-1 p-3 border border-gray-300 bg-white text-black rounded-md shadow-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-1 p-3 border border-gray-300 bg-white text-black rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full mt-1 p-3 border border-gray-300 bg-white text-black rounded-md shadow-sm"
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 focus:ring-4 focus:ring-yellow-400 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <section
        ref={mapRef}
        className={`mt-16 ${
          mapInView ? "animate__animated animate__fadeInUp" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center">
            Find Us
          </h2>
          <p className="text-center text-gray-600 mt-4">
            Locate Calgary Chauffeur Services easily. Use the map below to
            navigate to our location.
          </p>
        </div>
        <div className="relative h-[500px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.7535185366454!2d-114.21445068423015!3d51.12060387957245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537164b5dfe0871d%3A0x4a33395a0b36560d!2s111%20Scenic%20Way%20NW%2C%20Calgary%2C%20AB%20T3L%201B5%2C%20Canada!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            aria-hidden="false"
            title="Location Map"
            className="absolute inset-0 border-0"
          ></iframe>
          <div className="absolute bottom-4 right-4">
            <a
              href="https://www.google.com/maps/dir//111+Scenic+Way+NW,+Calgary,+AB+T3L+1B5,+Canada"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg shadow-lg hover:bg-yellow-500 transition transform hover:scale-105"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
