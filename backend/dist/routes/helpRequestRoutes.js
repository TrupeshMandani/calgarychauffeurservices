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
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// Nodemailer setup
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Route to handle help request
router.post("/help-request", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const info = yield transporter.sendMail({
            from: `"Calgary Chauffeur Services" <${process.env.EMAIL_USER}>`,
            to: process.env.NEXT_PUBLIC_CLIENT_EMAIL, // Client's email
            subject: "New Help Request",
            html: emailContent,
        });
        console.log("Email Sent Info:", info); // Log email info
        res.status(200).json({ success: true, message: "Help request sent successfully!" });
    }
    catch (error) {
        console.error("Error sending email:", error); // Log error
        res.status(500).json({
            success: false,
            error: "Failed to send help request.",
        });
    }
}));
exports.default = router;
