"use client";
import React, { useEffect, useRef, useState } from "react";
import "animate.css";

const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: "bi-gem",
      title: "Luxury Vehicles",
      description:
        "Experience unparalleled luxury with our premium fleet of vehicles.",
    },
    {
      icon: "bi-clock-history",
      title: "24/7 Support",
      description:
        "Our team is available around the clock to assist you anytime.",
    },
    {
      icon: "bi-cash-stack",
      title: "Transparent Pricing",
      description: "No hidden fees—just competitive rates tailored for you.",
    },
  ];

  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.4 }
    );

    const currentRef = sectionRef.current; // Store the current ref value in a local variable

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`py-16 transition-all duration-1000 ${
        inView ? "bg-gray-900" : "bg-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center ${
            inView ? "animate__animated animate__fadeInDown" : "opacity-0"
          }`}
          style={{ animationDuration: "1s" }}
        >
          <h2 className="text-4xl font-extrabold text-white">
            Why Choose Chauffeur?
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Discover the difference with our exceptional service, premium
            vehicles, and unwavering commitment to excellence.
          </p>
        </div>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              {/* Icon Section */}
              <div
                className={`flex items-center justify-center h-16 w-16 rounded-full bg-yellow-500 text-gray-900 mx-auto shadow-lg ${
                  inView ? "animate__animated animate__backInLeft" : "opacity-0"
                }`}
                style={{
                  animationDuration: "0.8s",
                  animationDelay: `${index * 0.2}s`,
                }}
                onAnimationEnd={(e) => {
                  if (inView) {
                    e.currentTarget.classList.remove("animate__backInLeft");
                    e.currentTarget.classList.add("animate__flip");
                  }
                }}
              >
                <i className={`bi ${reason.icon} text-4xl`}></i>
              </div>
              {/* Text Section */}
              <div
                className={`${
                  inView ? "animate__animated animate__fadeIn" : "opacity-0"
                }`}
                style={{
                  animationDuration: "0.5s",
                  animationDelay: `${index * 0.6 + 0.8}s`,
                }}
              >
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-base text-gray-400">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
