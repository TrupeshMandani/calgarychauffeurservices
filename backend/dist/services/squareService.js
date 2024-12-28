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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCustomerAndCard = void 0;
const square_1 = require("square");
const client = new square_1.Client({
    environment: process.env.SQUARE_ENVIRONMENT === "Production"
        ? square_1.Environment.Production
        : square_1.Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});
const saveCustomerAndCard = (cardToken, customerData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const customerResponse = yield client.customersApi.createCustomer({
        givenName: customerData.firstName,
        familyName: customerData.lastName,
        emailAddress: customerData.email,
    });
    const customerId = (_a = customerResponse.result.customer) === null || _a === void 0 ? void 0 : _a.id;
    if (!customerId)
        throw new Error("Failed to create customer.");
    const createCardResponse = yield client.cardsApi.createCard({
        idempotencyKey: new Date().toISOString(),
        sourceId: cardToken,
        card: { customerId },
    });
    const cardId = (_b = createCardResponse.result.card) === null || _b === void 0 ? void 0 : _b.id;
    if (!cardId)
        throw new Error("Failed to save card.");
    return { customerId, cardId };
});
exports.saveCustomerAndCard = saveCustomerAndCard;
