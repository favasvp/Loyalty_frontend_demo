import apiClient from "./client";

const rootUrl = "/redemption-rules";

// Rules and expiry settings API service
const rulesAndExpirySettingsApi = {
  // Get rules and expiry settings
   // Get rules and expiry settings
   getRules: async () => {
    const response = await apiClient.get(rootUrl);
    return response.data;
  },

  // Update rules and expiry settings
  updateRules: async (rulesData) => {
    const response = await apiClient.post(rootUrl, rulesData);
    return response.data;
  },


};

export default rulesAndExpirySettingsApi;
