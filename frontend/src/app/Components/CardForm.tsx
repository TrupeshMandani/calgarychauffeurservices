"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../_utils/Firebase"; // Adjust this path based on your project structure

declare const Square: {
  payments: (
    appId: string,
    locationId: string,
    options?: Record<string, unknown>
  ) => {
    card: () => Promise<{
      attach: (selector: string) => Promise<void>;
      tokenize: () => Promise<{ status: string; token: string }>;
    }>;
  };
};
type Card = {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token: string }>;
  configure?: (options: Record<string, unknown>) => void;
  destroy?: () => void;
  detach?: () => void;
  recalculateSize?: () => void;
};

export default function CardForm() {
  const [status, setStatus] = useState<string>(""); // Status message for payment process
  const [card, setCard] = useState<Card | null>(null); // Updated to use Card type or null
  const [showCardForm, setShowCardForm] = useState(false); // Show/hide card form
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Payment success flag
  const [paymentFailed, setPaymentFailed] = useState(false); // Payment failure flag
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  }); // Customer data state

  const [bookingInfo, setBookingInfo] = useState({
    pickupLocation: "N/A",
    dropoffLocation: "N/A",
    pickupDate: "N/A",
    pickupTime: "N/A",
    distance: "N/A",
    duration: "N/A",
  }); // Booking data state

  // Fetch authenticated user's email from Firebase Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setCustomerData((prevData) => ({
          ...prevData,
          email: user.email || "",
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch bookingInfo from Firestore
  useEffect(() => {
    const fetchBookingInfo = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const bookingId = urlParams.get("bookingId");

      if (!bookingId) {
        console.error("No booking ID found in the URL.");
        setStatus("Failed to load booking details.");
        return;
      }

      try {
        const bookingDoc = await getDoc(doc(db, "bookings", bookingId));
        if (!bookingDoc.exists()) {
          console.error("No booking data found in Firestore.");
          setStatus("Booking not found.");
          return;
        }
        setBookingInfo(bookingDoc.data() as typeof bookingInfo);
      } catch (error) {
        console.error("Error fetching booking info:", error);
        setStatus("Failed to load booking information.");
      }
    };

    fetchBookingInfo();
  }, []);

  // Initialize Square payment form
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

  // Validate customer form fields
  const isFormValid = () => {
    return (
      customerData.firstName &&
      customerData.lastName &&
      customerData.email &&
      customerData.phoneNumber &&
      customerData.address
    );
  };

  // Handle payment submission
  const handlePayment = async () => {
    if (!card) {
      setStatus("Card form is not ready.");
      return;
    }

    try {
      // Step 1: Tokenize card
      const result = await card.tokenize();
      if (result.status !== "OK") {
        setStatus("Card tokenization failed.");
        setPaymentFailed(true);
        return;
      }

      const cardToken = result.token;

      const saveCardResponse = await fetch(
        "http://localhost:3000/api/save-card",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardToken,
            customerData,
          }),
        }
      );

      const saveCardData = await saveCardResponse.json();
      if (!saveCardData.success) {
        setStatus("Failed to save card and customer.");
        setPaymentFailed(true);
        return;
      }

      setStatus("Payment successful! Processing notifications...");

      // Step 2: Notify customer and client
      const customerNotifyResponse = await fetch(
        "http://localhost:3000/api/notifications/notify-customer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerData, bookingInfo }),
        }
      );

      const customerNotifyData = await customerNotifyResponse.json();
      if (!customerNotifyData.success) {
        console.warn("Failed to notify customer:", customerNotifyData.error);
      }

      const clientNotifyResponse = await fetch(
        "http://localhost:3000/api/notifications/notify-client",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientData: {
              email: process.env.NEXT_PUBLIC_CLIENT_EMAIL, // Ensure this is set correctly in .env
            },
            customerData: customerData,
            bookingInfo: bookingInfo,
          }),
        }
      );
      const clientNotifyData = await clientNotifyResponse.json();
      if (!clientNotifyData.success) {
        console.warn("Failed to notify client:", clientNotifyData.error);
      }

      setPaymentSuccess(true);
      setStatus("Payment successful! Notifications sent.");
    } catch (error) {
      console.error("Error processing payment:", error);
      setStatus("Payment failed.");
      setPaymentFailed(true);
    }
  };

  // Handle customer form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  // Handle customer form submission
  const handleSubmitCustomerInfo = () => {
    if (isFormValid()) {
      setShowCardForm(true);
    } else {
      setStatus("Please fill in all required fields.");
    }
  };

  return (
    <>
      <Script
        src="https://web.squarecdn.com/v1/square.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Square SDK loaded successfully.")}
        onError={() => console.error("Failed to load Square SDK.")}
      />

      <div className="bg-white max-w-md mx-auto p-4">
        {paymentSuccess ? (
          <div className="p-4 bg-green-100 text-green-800 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
            <p>Your booking has been confirmed.</p>
          </div>
        ) : paymentFailed ? (
          <div className="p-4 bg-red-100 text-red-800 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Payment Failed!</h2>
            <p>Please try again or contact support.</p>
          </div>
        ) : (
          <>
            {!showCardForm ? (
              <>
                {/* Customer Information Form */}
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
                  className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-all duration-300"
                >
                  Proceed to Payment
                </button>
                <p className="mt-4 text-red-500">{status}</p>
              </>
            ) : (
              <>
                <div className="mb-4 p-4 bg-gray-100 rounded">
                  <h3 className="text-lg font-bold mb-2">
                    Customer Information
                  </h3>
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
                    <strong>Phone Number:</strong> {customerData.phoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {customerData.address}
                  </p>
                </div>
                <div id="card-container" className="border p-4 rounded"></div>
                <button
                  onClick={handlePayment}
                  disabled={status !== "Payment form ready."}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
                >
                  Submit Payment
                </button>
              </>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in ease-in-out;
        }
      `}</style>
    </>
  );
}
