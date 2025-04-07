import apiClient from "./client";

const rootUrl = "/point-expiry-rules";

// Rules and expiry settings API service
const rulesAndExpirationSettingsApi = {
  // Get rules and expiry settings
   // Get rules and expiry settings
   getExpiration: async () => {
    const response = await apiClient.get(rootUrl);
    return response.data;
  },

  // Update rules and expiry settings
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

export default rulesAndExpirationSettingsApi;
