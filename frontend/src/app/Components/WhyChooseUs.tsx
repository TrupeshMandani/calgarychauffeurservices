import React from "react";

const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: "bi-car-front",
      title: "Premium Vehicles",
      description: "Choose from our collection of luxury and premium vehicles",
    },
    {
      icon: "bi-shield-check",
      title: "24/7 Support",
      description: "Round-the-clock customer support for your convenience",
    },
    {
      icon: "bi-wallet2",
      title: "Best Rates",
      description: "Competitive pricing with no hidden charges",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Chauffeur?
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <i className={`bi ${reason.icon} text-2xl`}></i>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                {reason.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
