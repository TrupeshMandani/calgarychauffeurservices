"use client";
import React, { useState } from 'react';
import PayPalButton from '../Components/PayPalButton'; // Adjust the path as needed
import { FaMoneyBillAlt, FaHandHoldingUsd, FaPaypal } from 'react-icons/fa';

const PaymentPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-screen-lg p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Choose Payment Method
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0">
          {/* Pay with Cash Option */}
          <button
            onClick={() => setSelectedOption('cash')}
            className={`w-full py-4 px-6 flex items-center justify-center rounded-lg text-white font-bold text-lg transition-all duration-300 ${
              selectedOption === 'cash' ? 'bg-blue-700 shadow-lg' : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
            }`}
          >
            <FaMoneyBillAlt className="mr-3 text-2xl" />
            Pay with Cash
          </button>

          {/* Pay in Person Option */}
          <button
            onClick={() => setSelectedOption('person')}
            className={`w-full py-4 px-6 flex items-center justify-center rounded-lg text-white font-bold text-lg transition-all duration-300 ${
              selectedOption === 'person' ? 'bg-green-700 shadow-lg' : 'bg-green-500 hover:bg-green-600 hover:scale-105'
            }`}
          >
            <FaHandHoldingUsd className="mr-3 text-2xl" />
            Pay in Person
          </button>

          {/* Pay with PayPal Option */}
          <button
            onClick={() => setSelectedOption('paypal')}
            className={`w-full py-4 px-6 flex items-center justify-center rounded-lg text-white font-bold text-lg transition-all duration-300 ${
              selectedOption === 'paypal' ? 'bg-yellow-700 shadow-lg' : 'bg-yellow-500 hover:bg-yellow-600 hover:scale-105'
            }`}
          >
            <FaPaypal className="mr-3 text-2xl" />
            Pay with PayPal
          </button>
        </div>

        {/* Display Selected Option */}
        <div className="mt-10">
          {selectedOption === 'cash' && (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg fade-in">
              <p className="text-blue-700 font-medium text-lg">
                You have selected to pay with <strong>Cash</strong>.
              </p>
            </div>
          )}

          {selectedOption === 'person' && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg fade-in">
              <p className="text-green-700 font-medium text-lg">
                You have selected to pay <strong>in Person</strong>.
              </p>
            </div>
          )}

          {selectedOption === 'paypal' && (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg fade-in">
              <p className="text-yellow-700 font-medium text-lg mb-4">
                Please complete your payment using <strong>PayPal</strong>:
              </p>
              <PayPalButton />
            </div>
          )}
        </div>
      </div>

      {/* Fade-in Animation CSS */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
