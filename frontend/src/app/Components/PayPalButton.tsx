/* This code snippet is a TypeScript React component that integrates PayPal payment functionality using
the `@paypal/react-paypal-js` library. Here's a breakdown of what the code is doing: */
"use client";

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton: React.FC = () => {
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}
    >
      <div className="w-full max-w-md p-4">
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: "10.00",
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (!actions.order) {
              console.error("Order is undefined");
              return Promise.reject("Order is undefined");
            }

            try {
              const details = await actions.order.capture();
              alert(
                `Transaction completed by ${details.payer?.name?.given_name}`
              );
            } catch (err) {
              console.error("Error capturing order:", err);
              alert("An error occurred while capturing the payment.");
            }
          }}
          onError={(err) => {
            console.error("PayPal Checkout Error:", err);
            alert("An error occurred during the transaction.");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
