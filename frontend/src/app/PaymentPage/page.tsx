// 
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare const Square: any;

export default function PaymentPage() {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [status, setStatus] = useState<string>("Loading payment form...");

  const initializeSquare = async () => {
    if (typeof Square === "undefined") {
      console.error("Square SDK not loaded.");
      setStatus("Failed to load payment gateway.");
      return;
    }

    try {
      const payments = Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID!,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
        { environment: "sandbox" }
      );

      const card = await payments.card();
      await card.attach("#card-container");
      setStatus("Payment form ready.");
    } catch (error) {
      console.error("Error initializing Square:", error);
      setStatus("Error setting up payment form.");
    }
  };

  useEffect(() => {
    if (sdkLoaded) {
      initializeSquare();
    }
  }, [sdkLoaded]);

  return (
    <>
      <Script
        src="https://web.squarecdn.com/v1/square.js"
        strategy="beforeInteractive"
        onLoad={() => setSdkLoaded(true)}
        onError={() => setStatus("Failed to load payment gateway.")}
      />
      <div>
        <h1>Payment Page</h1>
        <p>{status}</p>
        <div id="card-container" style={{ minHeight: "150px", border: "1px solid #ccc", padding: "10px" }} />
      </div>
    </>
  );
}
