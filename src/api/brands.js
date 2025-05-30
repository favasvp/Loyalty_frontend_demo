import apiClient from "./client";

const rootUrl = "/coupon-brand";

const brandsApi = {

    // Get all brands
    getBrands: async (params) => {
        const response = await apiClient.get(rootUrl,{
            params
        });
        return response.data;
    },

    // Get brand by id
    getBrandById: async (id) => {
        const response = await apiClient.get(`${rootUrl}/${id}`);
        return response.data;
    },

    // Create new brand
    createBrand: async (data) => {
        const response = await apiClient.post(rootUrl, data);
        return response.data;
    },  

    // Update brand
    updateBrand: async (id, data) => {
        const response = await apiClient.put(`${rootUrl}/${id}`, data);
        return response.data;
    },

    // Delete brand
    deleteBrand: async (id) => {
        const response = await apiClient.delete(`${rootUrl}/${id}`);
        return response.data;
    },

}

export default brandsApi;
    
    
    
    

