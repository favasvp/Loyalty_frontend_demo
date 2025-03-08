import apiClient from "./client";
const rootUrl = "/point-expiry-rules";

// Point expiry rule API service
const pointExpiryRuleApi = {
  // Get all point expiry rules
  getPointExpiryRules: async () => {
    const response = await apiClient.get(rootUrl);
    return response.data;
  },

  createOrUpdatePointExpiryRule: async (pointExpiryRule) => {
    const response = await apiClient.post(rootUrl, pointExpiryRule);
    return response.data;
  },

  //userInformation with  point expiration
  getUserInformationWithPointExpiration: async (userId) => {
    const response = await apiClient.get(`${rootUrl}/users/${userId}/expiring-soon`);
    return response.data;
  },

}

export default pointExpiryRuleApi;
