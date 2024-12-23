/**
 * The function `page` renders a React component `CarBookingSection` within a `div` element.
 * @returns The `page` component is being returned, which includes the `CarBookingSection` component
 * wrapped inside a `div` element.
 */
import React from "react";
import CarBookingSection from "../Components/ContactUs";
import NavBar from "../Components/NavBar";

const page = () => {
  return (
    <div>
      {" "}
      <CarBookingSection />
    </div>
  );
};

export default page;
