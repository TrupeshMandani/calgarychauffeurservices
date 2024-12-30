"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare const Square: any;

export default function CardForm() {
    const [card, setCard] = useState<any>(null);
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [status, setStatus] = useState<string>("Loading payment form...");

    useEffect(() => {
        const initializeSquare = async () => {
            if (!sdkLoaded || typeof Square === "undefined" || !Square.payments) {
                console.error("Square SDK not ready.");
                setStatus("Square SDK not available.");
                return;
            }

            try {
                const payments = Square.payments(
                    process.env.NEXT_PUBLIC_SQUARE_APP_ID!,
                    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
                    { environment: "sandbox" }
                );

                console.log("Payments instance:", payments);

                const cardInstance = await payments.card();
                console.log("Card instance:", cardInstance);

                await cardInstance.attach("#card-container");
                console.log("Card form attached successfully.");
                setCard(cardInstance);
                setStatus("Payment form ready.");
            } catch (error) {
                console.error("Error initializing Square card form:", error);
                setStatus("Error initializing card form.");
            }
        };

        if (sdkLoaded) {
            initializeSquare();
        }
    }, [sdkLoaded]);

    return (
        <>
            <Script
                src="https://sandbox.web.squarecdn.com/v1/square.js"
                strategy="beforeInteractive"
                onLoad={() => {
                    console.log("Square SDK loaded.");
                    setSdkLoaded(true);
                }}
                onError={() => {
                    console.error("Failed to load Square SDK.");
                    setStatus("Failed to load payment gateway.");
                }}
            />

            <div className="max-w-md mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Secure Card Form</h2>
                <div id="card-container" className="mb-4 border p-4 rounded bg-gray-100">
                    {status === "Loading payment form..." && "Loading card form..."}
                </div>
                <p className="mt-4 text-gray-700">{status}</p>
            </div>
        </>
    );
}
