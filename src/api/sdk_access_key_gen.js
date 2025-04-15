import apiClient from "./client";

const rootUrl = "/sdk/access-keys";

const sdkAccessKeyGenApi = {
  // Get all sdk access key gen
  getSdkAccessKeyGen: async (id) => {
    const response = await apiClient.get(`${rootUrl}/${id}`);
    return response.data;
  },

  // Create new sdk access key gen
  generateSdkAccessKey: async (sdkAccessKeyGenData) => {
    const response = await apiClient.post(rootUrl, sdkAccessKeyGenData);
    return response.data;
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
