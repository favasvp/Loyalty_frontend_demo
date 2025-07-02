import axios from "axios";

// Create SDK API client
const sdkApiClient = axios.create({
  baseURL: import.meta.env.VITE_API || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// SDK API service for customer-facing operations
const sdkApi = {
  // Get customer details and point balance
  getCustomerDetails: async (customerId, apiKey) => {
    const response = await sdkApiClient.post(
      "/khedmah-sdk/customer",
      {
        customer_id: customerId,
      },
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );
    return response.data;
  },

  // Add points for customer
  addPoints: async (customerId, apiKey, pointsData) => {
    const response = await sdkApiClient.post(
      "/khedmah-sdk/add-points",
      {
        customer_id: customerId,
        ...pointsData,
      },
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );
    return response.data;
  },

  // Redeem points for customer
  redeemPoints: async (customerId, apiKey, redemptionData) => {
    const response = await sdkApiClient.post(
      "/khedmah-sdk/redeem-points",
      {
        customer_id: customerId,
        ...redemptionData,
      },
      {
        headers: {
          "api-key": apiKey,
        },
      }
    );
    return response.data;
  },
};

export default sdkApi;
