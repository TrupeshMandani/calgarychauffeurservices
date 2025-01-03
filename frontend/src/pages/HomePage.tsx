import React from "react";
import FeaturedCars from "@/app/Components/FeaturedCars";
import Footer from "@/app/Components/Footer";
import HeroSection from "@/app/Components/HeroSection";
import CarCard from "@/app/Components/CarCard";
import WhyChooseUs from "@/app/Components/WhyChooseUs";
import NavBar from "@/app/Components/NavBar";
import CardForm from "@/app/Components/CardForm";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <FeaturedCars />
    <CardForm/>
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
