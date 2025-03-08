import apiClient from "./client";

const rootUrl = "/referral-program-rules";

const referralProgramRulesApi = {

    // Get all referral programs
    getReferralProgramRules: async () => {
        const response = await apiClient.get(rootUrl);
        return response.data;
    },

    // Update referral program rule
    updateReferralProgramRule: async (id, referralProgramRuleData) => {
        const response = await apiClient.put(`${rootUrl}/${id}`, referralProgramRuleData);
        return response.data;
    },

    // Create referral program rule
    createReferralProgramRule: async (referralProgramRuleData) => {
        const response = await apiClient.post(rootUrl, referralProgramRuleData);
        return response.data;
    },

    // Delete referral program rule
    deleteReferralProgramRule: async (id) => {
        const response = await apiClient.delete(`${rootUrl}/${id}`);
        return response.data;
    },
    
    
    
    


}
    
export default referralProgramRulesApi;
