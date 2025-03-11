import apiClient from "./client";

const rootUrl = "/coupon-category";

const categoryApi = {

    // Get all category
    getCategory: async () => {
        const response = await apiClient.get(rootUrl);
        return response.data;
    },

    // Get category by id
    getCategoryById: async (id) => {
        const response = await apiClient.get(`${rootUrl}/${id}`);
        return response.data;
    },

    // Create new category
    createCategory: async (data) => {
        const response = await apiClient.post(rootUrl, data);
        return response.data;
    },  

    // Update category
    updateCategory: async (id, data) => {
        const response = await apiClient.put(`${rootUrl}/${id}`, data);
        return response.data;
    },

    // Delete category
    deleteCategory: async (id) => {
        const response = await apiClient.delete(`${rootUrl}/${id}`);
        return response.data;
    },

}

export default categoryApi;
    
    
    
    

