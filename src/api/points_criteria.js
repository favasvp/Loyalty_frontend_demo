import apiClient from "./client";

const rootUrl = "/point-criteria"


// Points management API service
const pointsCriteriaApi = {
  // Get all points criteria
  getPointsCriteria: async (params) => {
    const response = await apiClient.get(rootUrl, { params });
    return response.data;
  },

  // Get single points criteria by ID
  getPointsCriteriaById: async (id) => {
    const response = await apiClient.get(`${rootUrl}/${id}`);
    return response.data;
  },

  // Create new points criteria
  createPointsCriteria: async (criteriaData) => {
    const response = await apiClient.post(rootUrl, criteriaData);
    return response.data;
  },

  // Update points criteria
  updatePointsCriteria: async (id, criteriaData) => {
    const response = await apiClient.put(
      `${rootUrl}/${id}`,
      criteriaData
    );
    return response.data;
  },

  // Delete points criteria
  deletePointsCriteria: async (id) => {
    const response = await apiClient.delete(`${rootUrl}/${id}`);
    return response.data;
  },

  

 
};

export default pointsCriteriaApi;
