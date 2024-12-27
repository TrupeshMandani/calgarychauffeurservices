"use client";

import { useEffect, useState } from "react";

declare const Square: any;

export default function CardForm() {
  const [card, setCard] = useState<any>(null);
  const [status, setStatus] = useState<string>("Loading payment form...");
  // Initialize Square Web Payments SDK
  useEffect(() => {
    const initializeSquare = async () => {
      try {
        // Ensure Square SDK is loaded
        if (typeof Square === "undefined" || !Square.payments) {
          console.error("Square Web Payments SDK not loaded.");
          setStatus("Payment gateway not available.");
          return;
        }

        console.log("Square SDK loaded.");

        const isProduction = process.env.SQUARE_ENVIRONMENT === "production";

        const payments = Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APP_ID!,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
          {
            environment: isProduction ? "production" : "sandbox",
          }
        );

        if (!payments) {
          console.error("Failed to initialize Square Payments.");
          setStatus("Error initializing payment gateway.");
          return;
        }

        const card = await payments.card();
        try {
          await card.attach("#card-container");
          console.log("Card form attached successfully.");
          setCard(card);
          setStatus("Payment form ready.");
        } catch (error) {
          console.error("Error attaching card form:", error);
          setStatus("Error attaching payment form. Please try again.");
        }
      } catch (error) {
        console.error("Error initializing Square Payments:", error);
        setStatus("Error initializing payment form. Please try again.");
      }
    };

    const checkSquareLoaded = () => {
      if (typeof Square !== "undefined") {
        initializeSquare();
      } else {
        console.log("Retrying Square SDK load...");
        setTimeout(checkSquareLoaded, 500);
      }
    };

    checkSquareLoaded();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Secure Card Form</h2>
      <div
        id="card-container"
        className="mb-4 border p-4 rounded bg-gray-100"
        style={{ minHeight: "150px" }}
      >
        {status === "Loading payment form..." && "Loading card form..."}
      </div>
      {status && (
        <p
          className={`mt-2 ${
            status.includes("ready") ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
