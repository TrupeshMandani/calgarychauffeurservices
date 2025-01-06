
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

  const [bookingInfo, setBookingInfo] = useState({
    pickupLocation: "N/A",
    dropoffLocation: "N/A",
    pickupDate: "N/A",
    pickupTime: "N/A",
    distance: "N/A",
    duration: "N/A",
  });

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

  const isFormValid = () => {
    return (
      customerData.firstName &&
      customerData.lastName &&
      customerData.email &&
      customerData.phoneNumber &&
      customerData.address
    );
  };

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

  // const handlePayment = async () => {
  //   if (!card) {
  //     setStatus("Card form is not ready.");
  //     return;
  //   }

  //   try {
  //     const result = await card.tokenize();
  //     if (result.status !== "OK") {
  //       setStatus("Card tokenization failed.");
  //       setPaymentFailed(true);
  //       return;
  //     }

  //     const response = await fetch("http://localhost:3000/api/save-card", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         cardToken: result.token,
  //         customerData,
  //       }),
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       setStatus("Payment successful!");
  //       setPaymentSuccess(true);
  //     } else {
  //       setStatus("Failed to save card and customer.");
  //       setPaymentFailed(true);
  //     }
  //   } catch (error) {
  //     setStatus("An error occurred while saving card and customer.");
  //     setPaymentFailed(true);
  //   }
  // };

  const handlePayment = async () => {
    if (!card) {
      setStatus("Card form is not ready.");
      return;
    }
  
    try {
      // Step 1: Tokenize the card using Square SDK
      const result = await card.tokenize();
      if (result.status !== "OK") {
        setStatus("Card tokenization failed.");
        setPaymentFailed(true);
        return;
      }
  
      const cardToken = result.token;
  
      // Step 2: Prepare customer and booking details
      const customerDetails = {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phoneNumber: customerData.phoneNumber,
        address: customerData.address,
      };
  
      const bookingDetails = {
        pickupLocation: bookingInfo.pickupLocation,
        dropoffLocation: bookingInfo.dropoffLocation,
        pickupDate: bookingInfo.pickupDate,
        pickupTime: bookingInfo.pickupTime,
        distance: bookingInfo.distance,
        duration: bookingInfo.duration,
      };
  
      // Step 3: Save card and customer information
      const saveCardResponse = await fetch("http://localhost:3000/api/save-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardToken,
          customerData,
        }),
      });
      
  
      const saveCardData = await saveCardResponse.json();
      if (!saveCardData.success) {
        setStatus("Failed to save card and customer.");
        setPaymentFailed(true);
        return;
      }
  
      setStatus("Payment successful! Processing notifications...");
  
      // Step 4: Send customer notification
      const customerNotifyResponse = await fetch("http://localhost:3000/api/notifications/notify-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerData: customerDetails,
          bookingInfo: bookingDetails,
        }),
      });
  
      const customerNotifyData = await customerNotifyResponse.json();
      if (!customerNotifyData.success) {
        console.warn("Failed to notify customer:", customerNotifyData.error);
      }
  
      // Step 5: Send client notification
      const clientNotifyResponse = await fetch("http://localhost:3000/api/notifications/notify-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientData: {
            name: "Your Client's Name",
            email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
            phoneNumber: process.env.NEXT_PUBLIC_CLIENT_PHONE_NUMBER,
          },
          bookingInfo: bookingDetails,
        }),
      });
      
      const clientNotifyData = await clientNotifyResponse.json();
      if (!clientNotifyData.success) {
        console.warn("Failed to notify client:", clientNotifyData.error);
      }
  
      // Step 6: Update UI to reflect success
      setPaymentSuccess(true);
      setStatus("Payment completed! Notifications sent to customer and client.");
    } catch (error) {
      console.error("Error during payment handling:", error);
      setStatus("An error occurred during payment processing.");
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
          <div
            className="p-4 bg-green-100 text-green-800 rounded shadow-md text-center animate-fade-in"
            style={{ animationDuration: "1s" }}
          >
            <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
            <p>Your Booking has Conformed.</p>
          </div>
        ) : (
          <>
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
                <div className="mb-4 p-4 bg-gray-100 rounded">
                  <h3 className="text-lg font-bold mb-2">Customer Information</h3>
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
