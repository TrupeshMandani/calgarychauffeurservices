import twilio from "twilio";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Twilio setup
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export const sendCustomerNotification = async (
    customerData: any,
    bookingInfo: any
  ) => {
    // Email content
    const emailContent = `
      <h1>Booking Confirmation</h1>
      <p>Hello ${customerData.firstName},</p>
      <p>Your booking is confirmed:</p>
      <ul>
        <li>Pickup: ${bookingInfo.pickupLocation}</li>
        <li>Dropoff: ${bookingInfo.dropoffLocation}</li>
        <li>Date: ${bookingInfo.pickupDate}</li>
        <li>Time: ${bookingInfo.pickupTime}</li>
      </ul>
    `;
  
    // Send Email
    await transporter.sendMail({
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: customerData.email,
      subject: "Booking Confirmation",
      html: emailContent,
    });
  };
  

  export const sendClientNotification = async (clientData: any, bookingInfo: any) => {
    console.log("Client Email:", clientData.email); // Log the client email
    
    // Email content
    const emailContent = `
      <h1>New Booking Alert</h1>
      <p>Details:</p>
      <ul>
        <li>Customer: ${clientData.name}</li>
        <li>Pickup: ${bookingInfo.pickupLocation}</li>
        <li>Dropoff: ${bookingInfo.dropoffLocation}</li>
        <li>Date: ${bookingInfo.pickupDate}</li>
        <li>Time: ${bookingInfo.pickupTime}</li>
      </ul>
    `;
  
    if (!clientData.email) {
      throw new Error("Client email is missing.");
    }
  
    // Send Email
    await transporter.sendMail({
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: clientData.email,
      subject: "New Booking Alert",
      html: emailContent,
    });
  };
  
  
