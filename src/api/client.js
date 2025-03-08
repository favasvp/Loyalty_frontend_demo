import axios from "axios";

// Create an Axios instance with default config
const productionUrl = "https://api-loyalty.xyvin.com/api/v1/";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || productionUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle authentication errors
    if (response && response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    // Handle server errors
    if (response && response.status >= 500) {
      console.error("Server error:", error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
