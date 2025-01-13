import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

// Route to handle help request
router.post("/help-request", async (req: Request, res: Response) => {
    const { firstName, lastName, email, message } = req.body;
  
    console.log("Received Request:", req.body); // Log incoming request payload
  
    // Validate request data
    if (!firstName || !lastName || !email || !message) {
      console.error("Validation Error: Missing required fields.");
      return res.status(400).json({
        success: false,
        error: "Missing required fields: firstName, lastName, email, or message.",
      });
    }
  
    try {
      const emailContent = `
        <h1>Help Request</h1>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `;
  
      // Send email to client
      const info = await transporter.sendMail({
        from: `"Calgary Chauffeur Services" <${process.env.EMAIL_USER}>`,
        to: process.env.NEXT_PUBLIC_CLIENT_EMAIL!, // Client's email
        subject: "New Help Request",
        html: emailContent,
      });
  
      console.log("Email Sent Info:", info); // Log email info
      res.status(200).json({ success: true, message: "Help request sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error); // Log error
      res.status(500).json({
        success: false,
        error: "Failed to send help request.",
      });
    }
  });
  

export default router;
