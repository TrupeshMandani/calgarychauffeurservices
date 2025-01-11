"use strict";
// import twilio from "twilio";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendClientNotification = exports.sendCustomerNotification = void 0;
// dotenv.config();
// // Twilio setup
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID!,
//   process.env.TWILIO_AUTH_TOKEN!
// );
// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER!,
//     pass: process.env.EMAIL_PASS!,
//   },
// });
// export const sendCustomerNotification = async (
//     customerData: any,
//     bookingInfo: any
//   ) => {
//     // Email content
//     const emailContent = `
//       <h1>Booking Confirmation</h1>
//       <p>Hello ${customerData.firstName},</p>
//       <p>Your booking is confirmed:</p>
//       <ul>
//         <li>Pickup: ${bookingInfo.pickupLocation}</li>
//         <li>Dropoff: ${bookingInfo.dropoffLocation}</li>
//         <li>Date: ${bookingInfo.pickupDate}</li>
//         <li>Time: ${bookingInfo.pickupTime}</li>
//       </ul>
//     `;
//     // Send Email
//     await transporter.sendMail({
//       from: `"Your Company" <${process.env.EMAIL_USER}>`,
//       to: customerData.email,
//       subject: "Booking Confirmation",
//       html: emailContent,
//     });
//   };
//   export const sendClientNotification = async (clientData: any, bookingInfo: any) => {
//     console.log("Client Email:", clientData.email); // Log the client email
//     // Email content
//     const emailContent = `
//       <h1>New Booking Alert</h1>
//       <p>Details:</p>
//       <ul>
//         <li>Customer: ${clientData.name}</li>
//         <li>Pickup: ${bookingInfo.pickupLocation}</li>
//         <li>Dropoff: ${bookingInfo.dropoffLocation}</li>
//         <li>Date: ${bookingInfo.pickupDate}</li>
//         <li>Time: ${bookingInfo.pickupTime}</li>
//       </ul>
//     `;
//     if (!clientData.email) {
//       throw new Error("Client email is missing.");
//     }
//     // Send Email
//     await transporter.sendMail({
//       from: `"Your Company" <${process.env.EMAIL_USER}>`,
//       to: clientData.email,
//       subject: "New Booking Alert",
//       html: emailContent,
//     });
//   };
const twilio_1 = __importDefault(require("twilio"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Twilio setup
const twilioClient = (0, twilio_1.default)(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
// Nodemailer setup
const transporter = nodemailer_1.default.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Send email to the customer
const sendCustomerNotification = (customerData, bookingInfo) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const emailContent = `
    <h1>Booking Confirmation</h1>
    <p>Hello ${customerData.firstName} ${customerData.lastName},</p>
    <p>Your booking is confirmed:</p>
    <ul>
      <li><strong>Pickup Location:</strong> ${bookingInfo.pickupLocation}</li>
      <li><strong>Dropoff Location:</strong> ${bookingInfo.dropoffLocation}</li>
      <li><strong>Pickup Date:</strong> ${bookingInfo.pickupDate}</li>
      <li><strong>Pickup Time:</strong> ${bookingInfo.pickupTime}</li>
      <li><strong>Distance:</strong> ${bookingInfo.distance}</li>
      <li><strong>Duration:</strong> ${bookingInfo.duration}</li>
    </ul>
    <p>Thank you for choosing our service!</p>
  `;
    yield transporter.sendMail({
      from: `"Calgary Chauffeur Services" <${process.env.EMAIL_USER}>`,
      to: customerData.email,
      subject: "Booking Confirmation",
      html: emailContent,
    });
  });
exports.sendCustomerNotification = sendCustomerNotification;
// Send email to the client
const sendClientNotification = (clientData, customerData, bookingInfo) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Validate clientData
    if (!clientData || !clientData.email) {
      throw new Error("Client email is missing or invalid.");
    }
    if (!customerData || !customerData.firstName || !customerData.lastName) {
      throw new Error("Customer data is missing or invalid.");
    }
    if (
      !bookingInfo ||
      !bookingInfo.pickupLocation ||
      !bookingInfo.dropoffLocation
    ) {
      throw new Error("Booking data is missing or invalid.");
    }
    const emailContent = `
    <h1>New Booking Alert</h1>
    <p>Here are the details of the new booking:</p>
    <h2>Customer Details</h2>
    <ul>
      <li><strong>Name:</strong> ${customerData.firstName} ${customerData.lastName}</li>
      <li><strong>Email:</strong> ${customerData.email}</li>
      <li><strong>Phone Number:</strong> ${customerData.phoneNumber}</li>
      <li><strong>Address:</strong> ${customerData.address}</li>
    </ul>
    <h2>Booking Details</h2>
    <ul>
      <li><strong>Pickup Location:</strong> ${bookingInfo.pickupLocation}</li>
      <li><strong>Dropoff Location:</strong> ${bookingInfo.dropoffLocation}</li>
      <li><strong>Pickup Date:</strong> ${bookingInfo.pickupDate}</li>
      <li><strong>Pickup Time:</strong> ${bookingInfo.pickupTime}</li>
      <li><strong>Distance:</strong> ${bookingInfo.distance}</li>
      <li><strong>Duration:</strong> ${bookingInfo.duration}</li>
    </ul>
  `;
    yield transporter.sendMail({
      from: `"Calgary Chauffeur Services" <${process.env.EMAIL_USER}>`,
      to: clientData.email,
      subject: "New Booking Alert",
      html: emailContent,
    });
  });
exports.sendClientNotification = sendClientNotification;
