import apiClient from "./client";
const rootUrl = "/kedmah-offers";
const khedmahofferApi = {
  getKhedmahOffers: async () => {
    const response = await apiClient.get(rootUrl);
    return response.data;
  },
  getKhedmahOfferById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/${id}`);
    return response.data;
  },
  addKhedmahOffer: async (data) => {
    const response = await apiClient.post(rootUrl, data);
    return response.data;
  },
  updateKhedmahOffer: async (id, data) => {
    const response = await apiClient.put(`${rootUrl}/${id}`, data);
    return response.data;
  },
  deleteKhedmahOffer: async (id) => {
    const response = await apiClient.delete(`${rootUrl}/${id}`);
    return response.data;
  },
};

export default khedmahofferApi;
