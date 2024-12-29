import express, { Request, Response } from "express";
import { saveCustomerAndCard } from "../services/squareService";

const router = express.Router();

router.post("/save-card", async (req: Request, res: Response) => {
  const { cardToken, customerData } = req.body;

  try {
    const result = await saveCustomerAndCard(cardToken, customerData);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";

    // Safely handle the 'unknown' error type
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as any).message;
    }

    console.error("Error in /save-card route:", errorMessage);
    res.status(500).json({ success: false, error: errorMessage });
  }
});

export default router;
