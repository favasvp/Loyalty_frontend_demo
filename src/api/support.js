import apiClient from "./client";

const rootUrl = "/customer-support";

const supportApi = {
  getTickets: async () => {
    const response = await apiClient.get(rootUrl);
    return response.data;
  },
  getTicketById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/${id}`);
    return response.data;
  },
  addMessage: async (id, data) => {
    const response = await apiClient.post(`${rootUrl}/${id}/messages`, data);
    return response.data;
  },
  updateStatus: async (id, data) => {
    const response = await apiClient.put(`${rootUrl}/${id}`, data);
    return response.data;
  },
};

export default supportApi;
