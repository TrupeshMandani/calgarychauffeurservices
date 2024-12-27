import { Client, Environment } from "square";
import { v4 as uuidv4 } from "uuid"; // For generating unique idempotency keys

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
}

const client = new Client({
  environment: Environment.Sandbox, // Use Environment.Production for production
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
});

export const saveCustomerAndCard = async (
  cardToken: string,
  customerData: CustomerData
) => {
  try {
    // Step 1: Create the customer
    const customerResponse = await client.customersApi.createCustomer({
      givenName: customerData.firstName,
      familyName: customerData.lastName,
      emailAddress: customerData.email,
    });

    const customerId = customerResponse.result.customer?.id;

    if (!customerId) {
      throw new Error("Failed to create customer.");
    }

    // Step 2: Save the card on file
    const createCardResponse = await client.cardsApi.createCard({
      idempotencyKey: uuidv4(), // Unique key for idempotency
      sourceId: cardToken, // Card token received from the frontend
      card: {
<<<<<<< HEAD:backend/src/services/squareService.ts
        cardholderName: `${customerData.firstName} ${customerData.lastName}`, // Optional: cardholder's name
=======
        customerId: customerId, // Link the card to the created customer
>>>>>>> 4ceb5ee (Solved Errors):frontend/PaymentBackHand/services/squareService.ts
      },
    });
    
    const cardId = createCardResponse.result.card?.id;

    if (!cardId) {
      throw new Error("Failed to save the card.");
    }

    return { customerId, cardId };
  } catch (error) {
    console.error("Error saving customer and card:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
