import apiClient from "./client";

const rootUrl = "/tiers";

// Tiers API service
const tiersApi = {
  // Get all tiers
// Get all tiers
getTiers: async () => {
    const response = await apiClient.get(rootUrl);
    return response.data;
  },

  // Get tier by ID
  getTierById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/${id}`);
    return response.data;
  },

  // Create new tier
  createTier: async (tierData) => {
    const response = await apiClient.post(rootUrl, tierData);
    return response.data;
  },

  // Update tier
  updateTier: async (id, tierData) => {
    const response = await apiClient.put(`${rootUrl}/${id}`, tierData);
    return response.data;
  },

  // Delete tier
  deleteTier: async (id) => {
    const response = await apiClient.delete(`${rootUrl}/${id}`);
    return response.data;
  },




};

export default tiersApi;
