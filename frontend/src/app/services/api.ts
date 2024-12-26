export interface CustomerData {
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export const saveCustomerCard = async (
    cardToken: string,
    customerData: CustomerData
  ): Promise<{ success: boolean; customerId?: string; cardId?: string; error?: string }> => {
    const response = await fetch("/api/save-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardToken, customerData }),
    });
    return response.json();
  };
  