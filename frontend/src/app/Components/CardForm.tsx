
// "use client";

// import { useEffect, useState } from "react";
// import Script from "next/script";

// declare const Square: any;

// export default function CardForm() {
//   const [status, setStatus] = useState("Loading payment form...");
//   const [card, setCard] = useState<any>(null);

//   const initializeSquare = async () => {
//     try {
//       const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//       const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
//       const environment = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || "sandbox";

//       if (!appId || !locationId) {
//         setStatus("Missing Square configuration.");
//         console.error("Missing Square App ID or Location ID in environment variables.");
//         return;
//       }

//       if (typeof Square === "undefined" || !Square.payments) {
//         setStatus("Square SDK not available.");
//         console.error("Square SDK not loaded.");
//         return;
//       }

//       const payments = Square.payments(appId, locationId, { environment });

//       const cardInstance = await payments.card();
//       console.log("Card instance created:", cardInstance);

//       await cardInstance.attach("#card-container");
//       setCard(cardInstance);
//       setStatus("Payment form ready.");
//     } catch (error) {
//       console.error("Error initializing Square:", error);
//       setStatus("Error initializing payment form.");
//     }
//   };

//   const handlePayment = async () => {
//     if (!card) {
//       setStatus("Card form not ready.");
//       return;
//     }

//     try {
//       const result = await card.tokenize();
//       if (result.status === "OK") {
//         setStatus(`Payment successful! Token: ${result.token}`);
//         console.log("Token:", result.token);
//       } else {
//         setStatus("Card tokenization failed.");
//       }
//     } catch (error) {
//       console.error("Error during payment submission:", error);
//       setStatus("Error processing payment.");
//     }
//   };

//   useEffect(() => {
//     if (typeof Square !== "undefined") {
//       initializeSquare();
//     }
//   }, []);

//   return (
//     <>
//       <Script
//         src="https://sandbox.web.squarecdn.com/v1/square.js"
//         strategy="beforeInteractive"
//         onLoad={() => console.log("Square SDK loaded successfully.")}
//         onError={() => console.error("Failed to load Square SDK.")}
//       />

//       <div className="max-w-md mx-auto p-4">
//         <h2 className="text-xl font-bold mb-4">Square Payment Form</h2>
//         <div
//           id="card-container"
//           style={{
//             minHeight: "200px",
//             minWidth: "300px",
//             border: "1px solid #ccc",
//             padding: "10px",
//             backgroundColor: "#f9f9f9",
//             borderRadius: "8px",
//           }}
//         ></div>
//         <button
//           onClick={handlePayment}
//           disabled={status !== "Payment form ready."}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
//         >
//           Submit Payment
//         </button>
//         <p className="mt-4 text-gray-700">{status}</p>
//       </div>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare const Square: any;

export default function CardForm() {
  const [status, setStatus] = useState<string>("Loading payment form...");
  const [card, setCard] = useState<any>(null);
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Initialize Square Card Form
  const initializeSquare = async () => {
    try {
      const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
      const environment = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || "sandbox";

      if (!appId || !locationId) {
        setStatus("Missing Square configuration.");
        console.error("Square App ID or Location ID is not set.");
        return;
      }

      if (typeof Square === "undefined" || !Square.payments) {
        setStatus("Square SDK not available.");
        console.error("Square SDK is not loaded.");
        return;
      }

      const payments = Square.payments(appId, locationId, { environment });
      const cardInstance = await payments.card();

      await cardInstance.attach("#card-container");
      setCard(cardInstance);
      setStatus("Payment form ready.");
      console.log("Square Card Form attached successfully.");
    } catch (error) {
      console.error("Error initializing Square Card Form:", error);
      setStatus("Error loading payment form.");
    }
  };

  // Handle Payment Submission
  const handlePayment = async () => {
    if (!card) {
      setStatus("Card form is not ready.");
      return;
    }

    try {
      const result = await card.tokenize();
      if (result.status !== "OK") {
        setStatus("Card tokenization failed.");
        return;
      }

      // Send the card token and customer information to the backend
      const response = await fetch("http://localhost:3000/api/save-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardToken: result.token, // Card token from Square
          customerData, // Customer data from input fields
        }),
      });
      

      const data = await response.json();
      if (data.success) {
        setStatus("Card and customer saved successfully!");
      } else {
        setStatus("Failed to save card and customer.");
      }
    } catch (error) {
      console.error("Error during payment submission:", error);
      setStatus("An error occurred while saving card and customer.");
    }
  };

  // Load the Square Payment Form
  useEffect(() => {
    if (typeof Square !== "undefined") {
      initializeSquare();
    }
  }, []);

  // Handle input changes for customer data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  return (
    <>
      {/* Load Square SDK */}
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("Square SDK loaded successfully.")}
        onError={() => console.error("Failed to load Square SDK.")}
      />

      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Square Payment Form</h2>

        {/* Customer Information Form */}
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={customerData.firstName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your first name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={customerData.lastName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your last name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your email address"
          />
        </div>

        {/* Square Card Form */}
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

        {/* Submit Button */}
        <button
          onClick={handlePayment}
          disabled={status !== "Payment form ready."}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
        >
          Submit Payment
        </button>

        {/* Status Message */}
        <p className="mt-4 text-gray-700">{status}</p>
      </div>
    </>
  );
}
