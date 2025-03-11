import apiClient from "./client";

const rootUrl = "/point-expiry-rules";

// Rules and expiry settings API service
const rulesAndRedemptionSettingsApi = {
  // Get rules and expiry settings
   // Get rules and expiry settings
   getExpiration: async () => {
    const response = await apiClient.get(rootUrl);
    return response.data;
  },

  // Update rules and expiry settings
  updateRules: async (rulesData) => {
    const response = await apiClient.post(rootUrl, rulesData);
    return response.data;
  },

};

export default rulesAndRedemptionSettingsApi;
