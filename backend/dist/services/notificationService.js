"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendClientNotification = exports.sendCustomerNotification = void 0;
const twilio_1 = __importDefault(require("twilio"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Twilio setup
const twilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// Nodemailer setup
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendCustomerNotification = (customerData, bookingInfo) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield transporter.sendMail({
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: customerData.email,
        subject: "Booking Confirmation",
        html: emailContent,
    });
});
exports.sendCustomerNotification = sendCustomerNotification;
const sendClientNotification = (clientData, bookingInfo) => __awaiter(void 0, void 0, void 0, function* () {
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
    // Send Email
    yield transporter.sendMail({
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: clientData.email,
        subject: "New Booking Alert",
        html: emailContent,
    });
});
exports.sendClientNotification = sendClientNotification;
