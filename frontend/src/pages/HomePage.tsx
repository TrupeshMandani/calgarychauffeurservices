import React from "react";
import FeaturedCars from "@/app/Components/FeaturedCars";
import Footer from "@/app/Components/Footer";
import HeroSection from "@/app/Components/HeroSection";

import WhyChooseUs from "@/app/Components/WhyChooseUs";
import NavBar from "@/app/Components/NavBar";
import { Hero } from "@/app/BookingPage/hero";
import { BookingForm } from "@/app/BookingPage/BookingForm";
import ServicesPage from "@/app/ServiecePage/ServiecePage";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <FeaturedCars />
      <div className="py-2">
        <ServicesPage />
      </div>
      <Hero />
      <div className="px-4 pb-20 bg-gray-50">
        <BookingForm />
      </div>{" "}
      <div className="py-2"></div>
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
