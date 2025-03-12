import apiClient from "./client";

const rootUrl = "/transaction";

const transactionApi = {
  
  // Get all transactions
  getTransactions: async (params) => {
    const response = await apiClient.get(`${rootUrl}`, { params });
    return response.data;
  },

  // Get transaction by ID
  getTransactionById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/${id}`);
    return response.data;
  },

  // Create new transaction
  createTransaction: async (transactionData) => {
    const response = await apiClient.post(
      `${rootUrl}`,
      transactionData
    );
    return response.data;
  },

};

export default transactionApi;
