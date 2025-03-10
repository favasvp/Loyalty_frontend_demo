import apiClient from "./client";

const rootUrl = "/app-types";

const appTypesApi = {

    // Get all app types
    getAppTypes: async () => {
        const response = await apiClient.get(rootUrl);
        return response.data;
    },

    // Get app type by id
    getAppTypeById: async (id) => {
        const response = await apiClient.get(`${rootUrl}/${id}`);
        return response.data;
    },

    // Create new app type
    createAppType: async (appTypeData) => {
        const response = await apiClient.post(rootUrl, appTypeData);
        return response.data;
    },  

    // Update app type
    updateAppType: async (id, appTypeData) => {
        const response = await apiClient.put(`${rootUrl}/${id}`, appTypeData);
        return response.data;
    },

    // Delete app type
    deleteAppType: async (id) => {
        const response = await apiClient.delete(`${rootUrl}/${id}`);
        return response.data;
    },

}

export default appTypesApi;
    
    
    
    

