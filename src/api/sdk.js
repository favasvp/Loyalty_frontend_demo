import axios from "axios";

// Create SDK API client
const sdkApiClient = axios.create({
  baseURL:  "http://localhost:3002/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// SDK API service for customer-facing operations
const sdkApi = {
  // Get customer details
  getCustomerDetails: async (customerID, apiKey) => {
    try {
      const response = await sdkApiClient.post(
        "/khedmah-sdk/customer",
        {
          customer_id: customerID,
        },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer details:", error);
      throw error;
    }
  },

  // Get customer transaction history
  getTransactionHistory: async (customerID, apiKey, page = 1, limit = 20) => {
    try {
      const response = await sdkApiClient.post(
        "/khedmah-sdk/transaction-history",
        {
          customer_id: customerID,
          page,
          limit,
        },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching transaction history:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Add points to customer account
  addPoints: async (customerID, apiKey, transactionData) => {
    try {
      const response = await sdkApiClient.post(
        "/khedmah-sdk/add-points",
        {
          customer_id: customerID,
          ...transactionData,
        },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding points:", error);
      throw error;
    }
  },

  // Redeem points from customer account
  redeemPoints: async (customerID, apiKey, redemptionData) => {
    try {
      const response = await sdkApiClient.post(
        "/khedmah-sdk/redeem-points",
        {
          customer_id: customerID,
          ...redemptionData,
        },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error redeeming points:", error);
      throw error;
    }
  },
};

export default sdkApi;
