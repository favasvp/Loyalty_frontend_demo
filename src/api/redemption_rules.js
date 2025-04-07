import apiClient from "./client";

const rootUrl = "/redemption-rules";

// Rules and expiry settings API service
const rulesAndRedemptionSettingsApi = {
  // Get rules and expiry settings
   // Get rules and expiry settings
   getRules: async () => {
    const response = await apiClient.get(rootUrl);
    return response.data;
  },

 addRules: async (rulesData) => {
    const response = await apiClient.post(rootUrl, rulesData);
    return response.data;
  },
  updateRules: async (id,rulesData) => {
    const response = await apiClient.put(`${rootUrl}/${id}`,rulesData);
    return response.data;
  },

  getRulesByAppId: async (appId) => {
    const response = await apiClient.get(`${rootUrl}/app/${appId}`);
    return response.data;
  },
};

export default rulesAndRedemptionSettingsApi;
