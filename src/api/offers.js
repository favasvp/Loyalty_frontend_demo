import apiClient from "./client";

const rootUrl = "/merchant-offers";
const offersApi = {
  getMerchantOffers: async (params) => {
    const response = await apiClient.get(rootUrl, { params });
    return response.data;
  },
  createMerchantOffer: async (offerData) => {
    const response = await apiClient.post(`${rootUrl}/create`, offerData);
    return response.data;
  },
  createBulkMerchantOffer: async (offerData) => {
    const response = await apiClient.post(`${rootUrl}/bulk-create`, offerData);
    return response.data;
  },
  getMerchantOfferById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/${id}`);
    return response.data;
  },
  updateMerchantOffer: async (id, offerData) => {
    const response = await apiClient.put(`${rootUrl}/${id}`, offerData);
    return response.data;
  },
  deleteMerchantOffer: async (id) => {
    const response = await apiClient.delete(`${rootUrl}/${id}`);
    return response.data;
  },
};

export default offersApi;
