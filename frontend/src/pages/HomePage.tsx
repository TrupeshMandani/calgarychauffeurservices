import FeaturedCars from "@/app/Components/FeaturedCars";
import Footer from "@/app/Components/Footer";
import HeroSection from "@/app/Components/HeroSection";

import WhyChooseUs from "@/app/Components/WhyChooseUs";
import CardForm from "@/app/Components/CardForm";

import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCars />
      <CardForm />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
