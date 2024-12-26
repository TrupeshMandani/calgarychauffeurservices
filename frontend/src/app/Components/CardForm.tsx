'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../_utils/Firebase'; // Import Firebase auth

declare const Square: any; // Declare Square globally

export default function CardForm() {
    const [card, setCard] = useState<any>(null);
    const [status, setStatus] = useState<string>('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Listen for Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    id: currentUser.uid,
                    name: currentUser.displayName || 'Anonymous',
                    email: currentUser.email,
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const initializeSquare = async () => {
            try {
                if (!Square || !Square.payments) {
                    console.error('Square Web Payments SDK not loaded.');
                    setStatus('Payment gateway not available.');
                    return;
                }

                const payments = Square.payments(
                    process.env.NEXT_PUBLIC_SQUARE_APP_ID!,
                    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!
                );

                if (!payments) {
                    console.error('Failed to initialize Square Payments.');
                    setStatus('Error initializing payment gateway.');
                    return;
                }

                const cardInstance = await payments.card();
                await cardInstance.attach('#card-container');
                setCard(cardInstance);
                setStatus('');
            } catch (error) {
                console.error('Error initializing Square Payments:', error);
                setStatus('Error initializing payment form. Please try again.');
            }
        };

        initializeSquare();
    }, []);

    const handleSaveCard = async () => {
        if (!card || !user) {
            setStatus('User not logged in or card initialization failed.');
            return;
        }

        try {
            const result = await card.tokenize();
            if (result.status === 'OK') {
                const response = await fetch('/api/save-card', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firebaseUserId: user.id,
                        customerDetails: {
                            name: user.name,
                            email: user.email,
                            phone: '1234567890', // Replace with actual phone number if available
                        },
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Customer created successfully:', data.customerId);
                    setStatus('Card saved successfully!');
                } else {
                    setStatus('Error saving card.');
                }
            } else {
                console.error('Card tokenization failed:', result.errors);
                setStatus('Card tokenization failed. Please try again.');
            }
        } catch (error) {
            console.error('Error saving card:', error);
            setStatus('Error saving card. Please try again.');
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
            {status && <p className="mt-2 text-red-500">{status}</p>}
        </div>
    );
}
// 'use client';
// import React, { useEffect, useState } from "react";

// // Define props for the SquareForm
// interface SquareFormProps {
//   onSuccess: (message: string) => void;
//   onError: (error: string) => void;
// }

// // Define customer data type
// interface CustomerData {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// const SquareForm: React.FC<SquareFormProps> = ({ onSuccess, onError }) => {
//   const [card, setCard] = useState<any>(null);
//   const [customerData, setCustomerData] = useState<CustomerData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//   });

//   useEffect(() => {
//     const initializeSquare = async () => {
//       try {
//         const payments = (window as any).Square.payments(
//           process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!,
//           process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!
//         );

//         const cardInstance = await payments.card();
//         await cardInstance.attach("#card-container");
//         setCard(cardInstance);
//       } catch (error) {
//         console.error("Failed to initialize Square:", error);
//         onError("Failed to load payment integration.");
//       }
//     };

//     initializeSquare();
//   }, [onError]);

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCustomerData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!card) {
//       onError("Payment form is not initialized.");
//       return;
//     }

//     try {
//       // Tokenize the card
//       const result = await card.tokenize();
//       if (result.status === "OK") {
//         // Send token and customer data to backend
//         const response = await fetch("/api/save-card", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ cardToken: result.token, customerData }),
//         });
//         const data = await response.json();

//         if (data.success) {
//           onSuccess("Card saved successfully!");
//         } else {
//           onError(`Failed to save card: ${data.error}`);
//         }
//       } else {
//         onError("Failed to tokenize card.");
//       }
//     } catch (error) {
//       console.error("Error during card tokenization or saving:", error);
//       onError("An unexpected error occurred.");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Save Your Card</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             className="mt-1 p-2 border w-full rounded"
//             value={customerData.firstName}
//             onChange={handleFormChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             className="mt-1 p-2 border w-full rounded"
//             value={customerData.lastName}
//             onChange={handleFormChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="mt-1 p-2 border w-full rounded"
//             value={customerData.email}
//             onChange={handleFormChange}
//             required
//           />
//         </div>

//         <div id="card-container" className="mb-4"></div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Save Card
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SquareForm;

