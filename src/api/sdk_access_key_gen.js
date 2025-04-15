import apiClient from "./client";

const rootUrl = "/sdk/access-keys";

const sdkAccessKeyGenApi = {
  // Get all sdk access key gen
  getSdkAccessKeyGen: async (id) => {
    const response = await apiClient.get(`${rootUrl}/${id}`);
    return response.data;
  },

  // Create new sdk access key gen// sdkAccessKeyGenApi.js
  generateSdkAccessKey: (params) => {
    return apiClient.post(`${rootUrl}`,{}, {
      params,
    });
  },
  updateSdkAccessKey: async (id) => {
    const response = await apiClient.put(`${rootUrl}/${id}`);
    return response.data;
  },
  deleteSdkAccessKey: async () => {
    const response = await apiClient.delete(`${rootUrl}`);
    return response.data;
  },
};

export default sdkAccessKeyGenApi;
