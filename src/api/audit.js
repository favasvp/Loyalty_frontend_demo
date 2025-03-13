import apiClient from "./client";

const rootUrl = "/audit";

const auditApi = {
  getAdminActions: async (params) => {
    console.log("Params received in API call:", params);
    const response = await apiClient.get(`${rootUrl}/admin-actions`, {
      params,
    });
    return response.data;
  },
  getLogsById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/logs/${id}`);
    return response.data;
  },
};

export default auditApi;
