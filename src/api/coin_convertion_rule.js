import apiClient from "./client";

const rootUrl = "/coin-management";

    const coinConvertionRuleApi = {

    // Get all coin convertion rule
    getCoinConvertionRule: async () => {
        const response = await apiClient.get(rootUrl);
        return response.data;
    },
    
    // Get coin management by id
    getCoinManagementById: async (id) => {
        const response = await apiClient.get(`${rootUrl}/${id}`);
        return response.data;
    },

    // Create new coin management
    createCoinManagement: async (coinManagementData) => {
        const response = await apiClient.post(rootUrl, coinManagementData);
        return response.data;
    },

    // Update coin management
    updateCoinManagement: async (id, coinManagementData) => {
        const response = await apiClient.put(`${rootUrl}/${id}`, coinManagementData);
        return response.data;
    },

    resetCoinConvertionRule: async () => {
        const response = await apiClient.post(`${rootUrl}/reset`);
        return response.data;
    },
    
    
    
    
}

export default coinConvertionRuleApi;
