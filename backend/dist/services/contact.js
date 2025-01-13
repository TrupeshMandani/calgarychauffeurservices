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
exports.default = handler;
const nodemailer_1 = __importDefault(require("nodemailer"));
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "POST") {
            const { firstName, lastName, email, message } = req.body;
            if (!firstName || !lastName || !email || !message) {
                return res.status(400).json({ success: false, error: "All fields are required." });
            }
            try {
                // Configure Nodemailer transporter
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail", // Use your email service or SMTP configuration
                    auth: {
                        user: process.env.EMAIL_USER, // Your email address
                        pass: process.env.EMAIL_PASS, // Your email password
                    },
                });
                // Email options
                const mailOptions = {
                    from: `"${firstName} ${lastName}" <${email}>`, // Sender address
                    to: process.env.RECIPIENT_EMAIL, // Recipient address
                    subject: "New Contact Form Submission",
                    text: message, // Plain text body
                    html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p>
               <p>${message}</p>`, // HTML body
                };
                // Send the email
                yield transporter.sendMail(mailOptions);
                return res.status(200).json({ success: true, message: "Email sent successfully." });
            }
            catch (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ success: false, error: "Failed to send email." });
            }
        }
        else {
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}
