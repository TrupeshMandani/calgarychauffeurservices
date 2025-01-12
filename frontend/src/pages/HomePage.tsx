import React from "react";
import FeaturedCars from "@/app/Components/FeaturedCars";
import Footer from "@/app/Components/Footer";
import HeroSection from "@/app/Components/HeroSection";
import CarCard from "@/app/Components/CarCard";
import WhyChooseUs from "@/app/Components/WhyChooseUs";
import NavBar from "@/app/Components/NavBar";
import { Hero } from "@/app/BookingPage/hero";
import { BookingForm } from "@/app/BookingPage/BookingForm";
import ServicesPage from "@/app/ServiecePage/ServiecePage";
import ContactUs from "@/app/ContactUs/ContactUs";
import About from "@/app/AboutUs/AboutUs";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <FeaturedCars />
      <Hero />
      <div className="px-4 pb-20 bg-gray-50">
        <BookingForm />
      </div>{" "}
      <div className="py-2">
        <ServicesPage />
      </div>
      <div className="py-2"></div>
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
