import apiClient from "./client";

const rootUrl = "/sdk-access-key-gen";

const sdkAccessKeyGenApi = {

    // Get all sdk access key gen
    getSdkAccessKeyGen: async () => {
        const response = await apiClient.get(rootUrl);
        return response.data;
    },



    // Create new sdk access key gen
    generateSdkAccessKey: async (sdkAccessKeyGenData) => {
        const response = await apiClient.post(rootUrl, sdkAccessKeyGenData);
        return response.data;
    },
    updateSdkAccessKey: async ( sdkAccessKeyGenData) => {
        const response = await apiClient.put(`${rootUrl}`, sdkAccessKeyGenData);
        return response.data;
    },
    deleteSdkAccessKey: async () => {
        const response = await apiClient.delete(`${rootUrl}`);
        return response.data;
    },
}

export default sdkAccessKeyGenApi;

