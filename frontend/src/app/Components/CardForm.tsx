"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../_utils/Firebase"; // Replace with your Firebase utility file

declare const Square: any; // Ensure Square is globally declared

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function CardForm() {
  const [card, setCard] = useState<any>(null);
  const [status, setStatus] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          name: currentUser.displayName || "Anonymous",
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Initialize the Square Web Payments SDK
  useEffect(() => {
    const initializeSquare = async () => {
      try {
        // Check if the Square object is available
        if (typeof Square === "undefined" || !Square.payments) {
          console.error("Square Web Payments SDK not loaded.");
          setStatus("Payment gateway not available.");
          return;
        }

        const payments = Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APP_ID!,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!
        );

        if (!payments) {
          console.error("Failed to initialize Square Payments.");
          setStatus("Error initializing payment gateway.");
          return;
        }

        const card = await payments.card();
        await card.attach("#card-container");
        setCard(card);
        setStatus("Payment form initialized.");
      } catch (error) {
        console.error("Error initializing Square Payments:", error);
        setStatus("Error initializing payment form. Please try again.");
      }
    };

    // Ensure the SDK is loaded before attempting initialization
    const checkSquareLoaded = () => {
      if (typeof Square !== "undefined") {
        initializeSquare();
      } else {
        setTimeout(checkSquareLoaded, 500); // Retry after 500ms
      }
    };

    checkSquareLoaded();
  }, []);

  // Handle Save Card
  const handleSaveCard = async () => {
    if (!card || !user) {
      setStatus("User not logged in or card initialization failed.");
      return;
    }

    try {
      const result = await card.tokenize();
      if (result.status === "OK") {
        const customerData: CustomerData = {
          firstName: user.name.split(" ")[0] || "First",
          lastName: user.name.split(" ")[1] || "Last",
          email: user.email,
        };

        const response = await fetch("/api/save-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardToken: result.token,
            customerData,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Customer and card saved successfully:", data);
          setStatus("Card saved successfully!");
        } else {
          const errorData = await response.json();
          console.error("Error saving card:", errorData.error);
          setStatus(`Error saving card: ${errorData.error}`);
        }
      } else {
        console.error("Card tokenization failed:", result.errors);
        setStatus("Card tokenization failed. Please try again.");
      }
    } catch (error) {
      console.error("Error saving card:", error);
      setStatus("Error saving card. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Your Card</h2>
      {user ? (
        <p className="text-sm mb-4">
          Logged in as: {user.name} ({user.email})
        </p>
      ) : (
        <p className="text-sm mb-4 text-red-500">
          Please log in to add your card.
        </p>
      )}
      <div
        id="card-container"
        className="mb-4 border rounded p-2 bg-gray-100 h-20 flex items-center justify-center"
      >
        Loading card form...
      </div>
      <button
        onClick={handleSaveCard}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={!user || !card}
      >
        Save Card
      </button>
      {status && (
        <p
          className={`mt-2 ${
            status.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
