import apiClient from "./client";

const rootUrl = "/merchant-offers";
const offersApi = {
  createMerchantOffer: async (offerData) => {
    const response = await apiClient.post(
      `${rootUrl}/pre-generated`,
      offerData
    );
    return response.data;
  },
};

export default offersApi;
