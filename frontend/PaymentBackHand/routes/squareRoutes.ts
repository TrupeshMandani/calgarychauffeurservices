import express, { Request, Response } from "express";
import { saveCustomerAndCard } from "../services/squareService";

const router = express.Router();

router.post("/save-card", async (req: Request, res: Response) => {
  const { cardToken, customerData } = req.body;

  try {
    const result = await saveCustomerAndCard(cardToken, customerData);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    // Safely handle the 'unknown' error type
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred while saving the card.";

    console.error("Error in /save-card route:", errorMessage);
    res.status(500).json({ success: false, error: errorMessage });
  }
});

export default router;
