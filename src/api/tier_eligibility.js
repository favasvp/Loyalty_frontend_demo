import apiClient from "./client";

const rootUrl = "/tier-eligibility";

// Tier Eligibility API service
const tierEligibilityApi = {
    // Get all tier eligibility criteria
    getTierEligibilityCriteria: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const url = query ? `${rootUrl}?${query}` : rootUrl;
        const response = await apiClient.get(url);
        return response.data;
    },

    // Get tier eligibility criteria by ID
    getTierEligibilityCriteriaById: async (id) => {
        const response = await apiClient.get(`${rootUrl}/${id}`);
        return response.data;
    },

    // Create new tier eligibility criteria
    createTierEligibilityCriteria: async (data) => {
        const response = await apiClient.post(rootUrl, data);
        return response.data;
    },

    // Update tier eligibility criteria
    updateTierEligibilityCriteria: async (id, data) => {
        const response = await apiClient.put(`${rootUrl}/${id}`, data);
        return response.data;
    },

    // Delete tier eligibility criteria
    deleteTierEligibilityCriteria: async (id) => {
        const response = await apiClient.delete(`${rootUrl}/${id}`);
        return response.data;
    },

    // Get criteria for specific tier
    getCriteriaForTier: async (tierId, appType = null) => {
        const query = appType ? `?app_type=${appType}` : "";
        const response = await apiClient.get(`${rootUrl}/tier/${tierId}${query}`);
        return response.data;
    },
};

export default tierEligibilityApi; 