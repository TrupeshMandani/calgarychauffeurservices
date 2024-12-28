"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare const Square: any;

export default function CardForm() {
  const [card, setCard] = useState<any>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [status, setStatus] = useState<string>("Loading payment form...");

  // Function to attach the card form to the DOM
  const attachCardForm = async (cardInstance: any) => {
    let retries = 3; // Number of retry attempts
    while (retries > 0) {
      try {
        console.log("Checking if #card-container exists...");
        const container = document.getElementById("card-container");
        if (!container) {
          console.error("Error: #card-container does not exist in the DOM.");
          setStatus("Error: Card container not found.");
          return;
        }

        console.log("Attempting to attach card form...");
        await cardInstance.attach("#card-container");
        console.log("Card form attached successfully.");
        return; // Exit on success
      } catch (error) {
        console.error("Error attaching card form. Retrying...", error);
        retries -= 1;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
      }
    }

    console.error("Failed to attach card form after 3 retries.");
    setStatus("Error: Unable to attach card form.");
  };

  // Function to initialize the Square Payments
  const initializeSquare = async () => {
    if (!sdkLoaded) {
      console.error("Square SDK not loaded.");
      setStatus("Payment gateway not available.");
      return;
    }

    try {
      console.log("Initializing Square Payments...");
      const environment =
        process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
          ? "production"
          : "sandbox";

      console.log("Environment:", environment);
      console.log("App ID:", process.env.NEXT_PUBLIC_SQUARE_APP_ID);
      console.log("Location ID:", process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID);

      const payments = Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID!,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
        { environment }
      );

      console.log("Payments instance created:", payments);

      if (!payments) {
        console.error("Failed to initialize Square Payments.");
        setStatus("Failed to initialize Square Payments.");
        return;
      }

      const cardInstance = await payments.card();
      console.log("Card instance created:", cardInstance);

      await attachCardForm(cardInstance);
      setCard(cardInstance);
      setStatus("Payment form ready.");
    } catch (error) {
      console.error("Error in initializeSquare:", error);
      setStatus("Error initializing payment form.");
    }
  };

  // Effect to initialize Square when SDK is loaded
  useEffect(() => {
    if (sdkLoaded) {
      console.log("SDK loaded. Initializing Square...");
      initializeSquare();
    }
  }, [sdkLoaded]);

  // Function to handle payment submission
  const handlePayment = async () => {
    if (!card) {
      setStatus("Card form not ready.");
      return;
    }

    try {
      const result = await card.tokenize();
      console.log("Tokenization result:", result);

      if (result.status !== "OK") {
        setStatus("Card tokenization failed.");
        return;
      }

      const response = await fetch("/api/save-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardToken: result.token,
          customerData: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
          },
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (data.success) {
        setStatus("Payment successful!");
      } else {
        setStatus("Payment failed.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setStatus("Error processing payment.");
    }
  };

  // Function to test backend connection
  const testBackendConnection = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/test");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Backend Response:", data);
      setStatus(data.message || "Backend test failed.");
    } catch (error) {
      console.error("Error testing backend connection:", error);
      setStatus("Failed to connect to backend.");
    }
  };

  return (
    <>
      {/* Dynamically load Square SDK */}
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("Square SDK loaded successfully.");
          setSdkLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load Square SDK.");
          setStatus("Failed to load payment gateway.");
        }}
      />

      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Secure Card Form</h2>
        <div
          id="card-container"
          className="mb-4 border p-4 rounded bg-gray-100"
          style={{ minHeight: "150px" }}
        >
          {status === "Loading payment form..." && "Loading card form..."}
        </div>
        <button
          onClick={handlePayment}
          disabled={!sdkLoaded || status !== "Payment form ready."}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Submit Payment
        </button>
        <button
          onClick={testBackendConnection}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4"
        >
          Test Backend Connection
        </button>
        <p className="mt-4 text-gray-700">{status}</p>
      </div>
    </>
  );
}
