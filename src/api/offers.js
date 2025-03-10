import apiClient from "./client";

const rootUrl = "/offers";

// Offers and promotions API service
const offersApi = {
  // Get all merchant offers
  getMerchantOffers: async (params) => {
    const response = await apiClient.get(`${rootUrl}/merchant`, { params });
    return response.data;
  },

  // Get merchant offer by ID
  getMerchantOfferById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/merchant/${id}`);
    return response.data;
  },

  // Create new merchant offer
  createMerchantOffer: async (offerData) => {
    const response = await apiClient.post(`${rootUrl}/merchant`, offerData);
    return response.data;
  },

  // Update merchant offer
  updateMerchantOffer: async (id, offerData) => {
    const response = await apiClient.put(`${rootUrl}/merchant/${id}`, offerData);
    return response.data;
  },

  // Delete merchant offer
  deleteMerchantOffer: async (id) => {
    const response = await apiClient.delete(`${rootUrl}/merchant/${id}`);
    return response.data;
  },

  // Get active offers
  getActiveOffers: async () => {
    const response = await apiClient.get(`${rootUrl}/active`);
    return response.data;
  },

  // Get offers by category
  getOffersByCategory: async (categoryId) => {
    const response = await apiClient.get(`${rootUrl}/category/${categoryId}`);
    return response.data;
  },

  // Get offers by brand
  getOffersByBrand: async (brandId) => {
    const response = await apiClient.get(`${rootUrl}/brand/${brandId}`);
    return response.data;
  },

  // Redeem offer
  redeemOffer: async (offerId, customerData) => {
    const response = await apiClient.post(
      `${rootUrl}/redeem/${offerId}`,
      customerData
    );
    return response.data;
  },

  // Get offer redemption history
  getOfferRedemptionHistory: async (offerId, params) => {
    const response = await apiClient.get(`${rootUrl}/redemptions/${offerId}`, {
      params,
    });
    return response.data;
  },
};

export default offersApi;
