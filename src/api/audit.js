import apiClient from "./client";

const rootUrl = "/audit";

const auditApi = {
  getAdminActions: async (params) => {
    const response = await apiClient.get(`${rootUrl}/admin-actions`, {
      params,
    });
    return response.data;
  },
  getLogsById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/logs/${id}`);
    return response.data;
  },

  getSdkLogs: async (params) => {
    const response = await apiClient.get(`${rootUrl}/sdk-api-logs`, {
      params,
    });
    return response.data;
  },
};

export default auditApi;
