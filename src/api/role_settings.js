import apiClient from "./client";

const rootUrl = "/role-settings";

const roleSettingsApi = {

    // Get all role settings
    getRoleSettings: async () => {
        const response = await apiClient.get(rootUrl);
        return response.data;
    },

    // Get role setting by id
    getRoleSettingById: async (id) => {
        const response = await apiClient.get(`${rootUrl}/${id}`);
        return response.data;
    },

    // Create new role setting
    createRoleSetting: async (roleSettingData) => {
        const response = await apiClient.post(rootUrl, roleSettingData);
        return response.data;
    },

    // Update role setting
    updateRoleSetting: async (id, roleSettingData) => {
        const response = await apiClient.put(`${rootUrl}/${id}`, roleSettingData);
        return response.data;
    },

    // Delete role setting
    deleteRoleSetting: async (id) => {
        const response = await apiClient.delete(`${rootUrl}/${id}`);
        return response.data;
    },
    
    
    
    
    
    


}

export default roleSettingsApi;
    

