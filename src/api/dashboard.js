import apiClient from "./client";

const rootUrl = "/dashboard";

export const dashboardApi = {
  // Get dashboard statistics
  getStats: () => apiClient.get(`${rootUrl}/stats`),
};
