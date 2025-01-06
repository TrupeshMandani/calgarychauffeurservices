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
const notificationService_1 = require("../services/notificationService");
const router = express_1.default.Router();
router.post("/notify-customer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerData, bookingInfo } = req.body;
    try {
        yield (0, notificationService_1.sendCustomerNotification)(customerData, bookingInfo);
        res.status(200).json({ success: true, message: "Customer notified successfully!" });
    }
    catch (error) {
        let errorMessage = "An unknown error occurred.";
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Error in notifying customer:", errorMessage);
        res.status(500).json({ success: false, error: errorMessage });
    }
}));
router.post("/notify-client", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientData, bookingInfo } = req.body;
    try {
        yield (0, notificationService_1.sendClientNotification)(clientData, bookingInfo);
        res.status(200).json({ success: true, message: "Client notified successfully!" });
    }
    catch (error) {
        let errorMessage = "An unknown error occurred.";
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Error in notifying client:", errorMessage);
        res.status(500).json({ success: false, error: errorMessage });
    }
}));
exports.default = router;
