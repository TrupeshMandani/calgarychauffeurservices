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
const squareService_1 = require("../services/squareService");
const router = express_1.default.Router();
router.post("/save-card", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardToken, customerData } = req.body;
    try {
        const result = yield (0, squareService_1.saveCustomerAndCard)(cardToken, customerData);
        res.status(200).json(Object.assign({ success: true }, result));
    }
    catch (error) {
        // Safely handle the 'unknown' error type
        const errorMessage = error instanceof Error
            ? error.message
            : "An unknown error occurred while saving the card.";
        console.error("Error in /save-card route:", errorMessage);
        res.status(500).json({ success: false, error: errorMessage });
    }
}));
exports.default = router;
