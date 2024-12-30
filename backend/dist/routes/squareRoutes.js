"use strict";
// import express, { Request, Response } from "express";
// import { saveCustomerAndCard } from "../services/squareService";
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
// const router = express.Router();
// router.post("/save-card", async (req: Request, res: Response) => {
//   const { cardToken, customerData } = req.body;
//   try {
//     const result = await saveCustomerAndCard(cardToken, customerData);
//     res.status(200).json({ success: true, ...result });
//   } catch (error) {
//     let errorMessage = "An unknown error occurred.";
//     // Safely handle the 'unknown' error type
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     } else if (typeof error === "object" && error !== null && "message" in error) {
//       errorMessage = (error as any).message;
//     }
//     console.error("Error in /save-card route:", errorMessage);
//     res.status(500).json({ success: false, error: errorMessage });
//   }
// });
// export default router;
const express_1 = __importDefault(require("express"));
const squareService_1 = require("../services/squareService");
const router = express_1.default.Router();
router.post("/save-card", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardToken, customerData } = req.body;
    console.log("Received /save-card request:");
    console.log("Card Token:", cardToken);
    console.log("Customer Data:", customerData);
    try {
        const result = yield (0, squareService_1.saveCustomerAndCard)(cardToken, customerData);
        res.status(200).json(Object.assign({ success: true }, result));
    }
    catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else if (typeof error === "object" && error !== null && "message" in error) {
            errorMessage = error.message;
        }
        console.error("Error in /save-card route:", error);
        res.status(500).json({ success: false, error: errorMessage });
    }
}));
exports.default = router;
