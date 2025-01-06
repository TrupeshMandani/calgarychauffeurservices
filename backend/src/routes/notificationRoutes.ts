import express, { Request, Response } from "express";
import { sendCustomerNotification, sendClientNotification } from "../services/notificationService";

const router = express.Router();

router.post("/notify-customer", async (req: Request, res: Response) => {
  const { customerData, bookingInfo } = req.body;

  try {
    await sendCustomerNotification(customerData, bookingInfo);
    res.status(200).json({ success: true, message: "Customer notified successfully!" });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error in notifying customer:", errorMessage);
    res.status(500).json({ success: false, error: errorMessage });
  }
});

router.post("/notify-client", async (req: Request, res: Response) => {
  const { clientData, bookingInfo } = req.body;

  try {
    await sendClientNotification(clientData, bookingInfo);
    res.status(200).json({ success: true, message: "Client notified successfully!" });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error in notifying client:", errorMessage);
    res.status(500).json({ success: false, error: errorMessage });
  }
});

export default router;
