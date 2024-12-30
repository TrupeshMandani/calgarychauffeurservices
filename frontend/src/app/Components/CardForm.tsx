"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare const Square: any;

export default function CardForm() {
  const [status, setStatus] = useState("Loading payment form...");
  const [card, setCard] = useState<any>(null);

  const initializeSquare = async () => {
    try {
      if (typeof Square === "undefined" || !Square.payments) {
        setStatus("Square SDK not available.");
        console.error("Square SDK not loaded.");
        return;
      }

      const payments = Square.payments(
        "sandbox-sq0idb-qnVKzO0vwx3ZhQiQBU5Jtg", // Replace with your Square Sandbox App ID
        "LZZAS82GJAWQC", // Replace with your Square Sandbox Location ID
        { environment: "sandbox" }
      );

      const cardInstance = await payments.card();
      console.log("Card instance created:", cardInstance);

      await cardInstance.attach("#card-container");
      setCard(cardInstance);
      setStatus("Payment form ready.");
    } catch (error) {
      console.error("Error initializing Square:", error);
      setStatus("Error initializing payment form.");
    }
  };

  const handlePayment = async () => {
    if (!card) {
      setStatus("Card form not ready.");
      return;
    }

    try {
      const result = await card.tokenize();
      if (result.status === "OK") {
        setStatus(`Payment successful! Token: ${result.token}`);
        console.log("Token:", result.token);
      } else {
        setStatus("Card tokenization failed.");
      }
    } catch (error) {
      console.error("Error during payment submission:", error);
      setStatus("Error processing payment.");
    }
  };

  useEffect(() => {
    if (typeof Square !== "undefined") {
      initializeSquare();
    }
  }, []);

  return (
    <>
      {/* Load the Square JavaScript SDK */}
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("Square SDK loaded successfully.")}
        onError={() => console.error("Failed to load Square SDK.")}
      />

      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Square Payment Form</h2>
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
        <p className="mt-4 text-gray-700">{status}</p>
      </div>
    </>
  );
}
