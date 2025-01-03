"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare const Square: any;

export default function CardForm() {
  const [status, setStatus] = useState<string>("");
  const [card, setCard] = useState<any>(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // Validate all required fields
  const isFormValid = () => {
    return (
      customerData.firstName &&
      customerData.lastName &&
      customerData.email &&
      customerData.phoneNumber &&
      customerData.address
    );
  };

  // Initialize Square Card Form
  const initializeSquare = async () => {
    try {
      const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
      const environment =
        process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || "PRODUCTION";

      if (!appId || !locationId) {
        setStatus("Missing Square configuration.");
        return;
      }

      if (typeof Square === "undefined" || !Square.payments) {
        setStatus("Square SDK not available.");
        return;
      }

      const payments = Square.payments(appId, locationId, { environment });
      const cardInstance = await payments.card();

      await cardInstance.attach("#card-container");
      setCard(cardInstance);
      setStatus("Payment form ready.");
    } catch (error) {
      console.error("Error initializing Square Card Form:", error);
      setStatus("Error loading payment form.");
    }
  };

  useEffect(() => {
    if (showCardForm) {
      const containerCheckInterval = setInterval(() => {
        const container = document.getElementById("card-container");
        if (container && typeof Square !== "undefined") {
          clearInterval(containerCheckInterval);
          initializeSquare();
        }
      }, 100);
    }
  }, [showCardForm]);

  const handlePayment = async () => {
    if (!card) {
      setStatus("Card form is not ready.");
      return;
    }

    try {
      const result = await card.tokenize();
      if (result.status !== "OK") {
        setStatus("Card tokenization failed.");
        setPaymentFailed(true);
        return;
      }

      const response = await fetch("http://localhost:3000/api/save-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardToken: result.token,
          customerData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("Payment successful!");
        setPaymentSuccess(true);
      } else {
        setStatus("Failed to save card and customer.");
        setPaymentFailed(true);
      }
    } catch (error) {
      setStatus("An error occurred while saving card and customer.");
      setPaymentFailed(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmitCustomerInfo = () => {
    if (isFormValid()) {
      setShowCardForm(true);
    } else {
      setStatus("Please fill in all required fields.");
    }
  };

  const renderCustomerDetails = () => (
    <div className="mb-4 p-4 border rounded bg-gray-100">
      <h3 className="text-lg font-bold">Customer Details</h3>
      <p>
        <strong>First Name:</strong> {customerData.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {customerData.lastName}
      </p>
      <p>
        <strong>Email:</strong> {customerData.email}
      </p>
      <p>
        <strong>Phone:</strong> {customerData.phoneNumber}
      </p>
      <p>
        <strong>Address:</strong> {customerData.address}
      </p>
    </div>
  );

  if (paymentSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="text-center p-6 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-bold text-green-600">
            Payment Successful!
          </h2>
          <p className="mt-2">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>
          {renderCustomerDetails()}
          <div className="mt-4">
            <svg
              className="w-16 h-16 text-green-600 mx-auto animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m2 6a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (paymentFailed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="text-center p-6 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">Payment Failed!</h2>
          <p className="mt-2">
            Unfortunately, we were unable to process your payment. Please try
            again.
          </p>
          {renderCustomerDetails()}
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://web.squarecdn.com/v1/square.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Square SDK loaded successfully.")}
        onError={() => console.error("Failed to load Square SDK.")}
      />

      <div className="bg-white max-w-md mx-auto p-4">
        {!showCardForm ? (
          <>
            <div className="mb-4">
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={customerData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-white"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={customerData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-white"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={customerData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-white"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={customerData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-white"
                placeholder="Enter your address"
                required
              />
            </div>
            <button
              onClick={handleSubmitCustomerInfo}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Proceed to Payment
            </button>
            <p className="mt-4 text-red-500">{status}</p>
          </>
        ) : (
          <>
            {renderCustomerDetails()}
            <div
              id="card-container"
              style={{
                minHeight: "200px",
                minWidth: "300px",
                border: "1px solid #ccc",
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
              }}
            ></div>

            <button
              onClick={handlePayment}
              disabled={status !== "Payment form ready."}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
            >
              Submit Payment
            </button>
          </>
        )}
      </div>
    </>
  );
}
