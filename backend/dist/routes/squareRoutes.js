"use strict";

const express = require("express");
const { saveCustomerAndCard } = require("../services/squareService");

const router = express.Router();

// Route: POST /save-card
router.post("/save-card", async (req, res) => {
  const { cardToken, customerData } = req.body;

  try {
    // Validate the incoming request body
    if (!cardToken || !customerData) {
      throw new Error(
        "Invalid request: cardToken and customerData are required."
      );
    }

    if (
      !customerData.firstName ||
      !customerData.lastName ||
      !customerData.email
    ) {
      throw new Error(
        "Invalid customerData: firstName, lastName, and email are required."
      );
    }

    // Process the card and customer data
    const result = await saveCustomerAndCard(cardToken, customerData);

    // Return success response
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    // Handle and log the error
    console.error("Error in /save-card route:", error);

    // Determine the response message
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred while saving the card.";

    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
});

module.exports = router;
