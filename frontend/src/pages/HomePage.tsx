import FeaturedCars from "@/app/Components/FeaturedCars";
import Footer from "@/app/Components/Footer";
import HeroSection from "@/app/Components/HeroSection";
import NavBar from "@/app/Components/NavBar";
import WhyChooseUs from "@/app/Components/WhyChooseUs";

import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection /> 
      <FeaturedCars />

      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
