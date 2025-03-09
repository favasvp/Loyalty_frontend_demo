import axios from "axios";
import { toast } from "react-toastify";
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

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Transform response data if needed
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
      return Promise.reject(error);
    }
    
    // Handle different error types
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/';
          toast({
            type: 'error',
            message: 'Your session has expired. Please log in again.',
          });
          break;
        case 403:
          // Forbidden
          toast({
            type: 'error',
            message: 'You do not have permission to perform this action.',
          });
          break;
        case 404:
          // Not found
          toast({
            type: 'error',
            message: 'The requested resource was not found.',
          });
          break;
        case 422:
          // Validation error
          { const validationErrors = data.errors || {};
          const firstError = Object.values(validationErrors)[0];
          toast({
            type: 'error',
            message: firstError || 'Validation error occurred.',
          });
          break; }
        case 500:
        case 502:
        case 503:
        case 504:
          // Server error
          toast({
            type: 'error',
            message: 'A server error occurred. Please try again later.',
          });
          break;
        default:
          // Other errors
          toast({
            type: 'error',
            message: data.message || 'An unexpected error occurred.',
          });
      }
    } else if (error.request) {
      // Request was made but no response received
      toast({
        type: 'error',
        message: 'No response from server. Please check your internet connection.',
      });
    } else {
      // Something else happened while setting up the request
      toast({
        type: 'error',
        message: error.message || 'An unexpected error occurred.',
      });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
