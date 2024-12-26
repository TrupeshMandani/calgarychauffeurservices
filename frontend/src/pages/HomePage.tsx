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
      <CardForm
        onSuccess={function (message: string): void {
          throw new Error("Function not implemented.");
        }}
        onError={function (error: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
