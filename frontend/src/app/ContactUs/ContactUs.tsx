"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import "animate.css";

const ContactUs = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true });
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch(
        "http://localhost:3000/api/help/help-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setStatus("Help request sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        throw new Error(responseData.error || "Failed to send help request.");
      }
    } catch (error) {
      console.error("Error sending help request:", error);
      setStatus("Failed to send help request. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 via-white to-gray-50 min-h-screen">
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

      <div
        ref={infoRef}
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-xl p-8 mt-12 px-6 lg:px-12 ${
          infoInView ? "animate__animated animate__fadeIn" : "opacity-0"
        }`}
      >
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
        <div
          ref={formRef}
          className={`rounded-lg p-6 lg:p-10 bg-gray-0 shadow-md ${
            formInView ? "animate__animated animate__fadeIn" : "opacity-0"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
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
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border border-gray-300 bg-white text-black rounded-md shadow-sm animate__animated animate__jackInTheBox"
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
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border border-gray-300 bg-white text-black rounded-md shadow-sm animate__animated animate__jackInTheBox"
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-1 p-3 border border-gray-300 bg-white text-black rounded-md shadow-sm animate__animated animate__jackInTheBox"
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
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full mt-1 p-3 border border-gray-300 bg-white text-black rounded-md shadow-sm animate__animated animate__jackInTheBox"
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800"
              >
                Send Message
              </button>
            </div>
          </form>
          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
