// import { Client, Environment } from "square";

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
import { Client, Environment } from "square";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  environment: process.env.SQUARE_ENVIRONMENT === "production" ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export const saveCustomerAndCard = async (
  cardToken: string,
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
  }
) => {
  try {
    console.log("Received Card Token:", cardToken);
    console.log("Received Customer Data:", customerData);

    const customerResponse = await client.customersApi.createCustomer({
      givenName: customerData.firstName,
      familyName: customerData.lastName,
      emailAddress: customerData.email,
    });
    console.log("Customer Response:", customerResponse);

    const customerId = customerResponse.result.customer?.id;
    if (!customerId) throw new Error("Failed to create customer.");

    const createCardResponse = await client.cardsApi.createCard({
      idempotencyKey: new Date().toISOString(),
      sourceId: cardToken,
      card: { customerId },
    });
    console.log("Card Response:", createCardResponse);

    const cardId = createCardResponse.result.card?.id;
    if (!cardId) throw new Error("Failed to save card.");

    return { customerId, cardId };
  } catch (error) {
    console.error("Error in saveCustomerAndCard:", error);
    throw error;
  }
};