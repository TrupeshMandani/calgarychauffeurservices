"use strict";
// import { Client, Environment } from "square";
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
exports.saveCustomerAndCard = void 0;
// const client = new Client({
//   environment:
//     process.env.SQUARE_ENVIRONMENT === "Production"
//       ? Environment.Production
//       : Environment.Sandbox,
//   accessToken: process.env.SQUARE_ACCESS_TOKEN!,
// });
// export const saveCustomerAndCard = async (
//   cardToken: string,
//   customerData: {
//     firstName: string;
//     lastName: string;
//     email: string;
//   }
// ) => {
//   const customerResponse = await client.customersApi.createCustomer({
//     givenName: customerData.firstName,
//     familyName: customerData.lastName,
//     emailAddress: customerData.email,
//   });
//   const customerId = customerResponse.result.customer?.id;
//   if (!customerId) throw new Error("Failed to create customer.");
//   const createCardResponse = await client.cardsApi.createCard({
//     idempotencyKey: new Date().toISOString(),
//     sourceId: cardToken,
//     card: { customerId },
//   });
//   const cardId = createCardResponse.result.card?.id;
//   if (!cardId) throw new Error("Failed to save card.");
//   return { customerId, cardId };
// };
const square_1 = require("square");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new square_1.Client({
    environment: process.env.SQUARE_ENVIRONMENT === "production" ? square_1.Environment.Production : square_1.Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});
const saveCustomerAndCard = (cardToken, customerData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("Received Card Token:", cardToken);
        console.log("Received Customer Data:", customerData);
        const customerResponse = yield client.customersApi.createCustomer({
            givenName: customerData.firstName,
            familyName: customerData.lastName,
            emailAddress: customerData.email,
            phoneNumber: customerData.phoneNumber,
            address: {
                addressLine1: customerData.address,
            },
        });
        console.log("Customer Response:", customerResponse);
        const customerId = (_a = customerResponse.result.customer) === null || _a === void 0 ? void 0 : _a.id;
        if (!customerId)
            throw new Error("Failed to create customer.");
        const createCardResponse = yield client.cardsApi.createCard({
            idempotencyKey: new Date().toISOString(),
            sourceId: cardToken,
            card: { customerId },
        });
        console.log("Card Response:", createCardResponse);
        const cardId = (_b = createCardResponse.result.card) === null || _b === void 0 ? void 0 : _b.id;
        if (!cardId)
            throw new Error("Failed to save card.");
        return { customerId, cardId };
    }
    catch (error) {
        console.error("Error in saveCustomerAndCard:", error);
        throw error;
    }
});
exports.saveCustomerAndCard = saveCustomerAndCard;
