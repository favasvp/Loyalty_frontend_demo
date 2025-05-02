import apiClient from "./client";

const uploadUrl = "/upload";

const uploadApi = {
  // Upload Image
  uploadImage: async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await apiClient.post(`${uploadUrl}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Update Image
  updateImage: async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await apiClient.put(`${uploadUrl}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Delete Image
  deleteImage: async () => {
    const response = await apiClient.delete(`${uploadUrl}/image`);
    return response.data;
  },
};

export default uploadApi;
