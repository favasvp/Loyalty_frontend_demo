import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "khedmah_customer_auth";

export const useCustomerAuth = () => {
  const [customerAuth, setCustomerAuth] = useState({
    customerID: null,
    apiKey: null,
    isAuthenticated: false,
    customerData: null,
  });

  // Initialize auth from URL params or localStorage
  useEffect(() => {
    const initializeAuth = () => {
      // First, check URL parameters
      const queryParams = new URLSearchParams(window.location.search);
      const urlCustomerID = queryParams.get("customerID");
      const urlApiKey = queryParams.get("apiKey");

      if (urlCustomerID && urlApiKey) {
        // Found parameters in URL, save them
        const authData = {
          customerID: urlCustomerID,
          apiKey: urlApiKey,
          isAuthenticated: true,
          customerData: null,
        };

        setCustomerAuth(authData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
        return;
      }

      // No URL params, check localStorage
      try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
          const parsedAuth = JSON.parse(stored);

          if (parsedAuth.customerID && parsedAuth.apiKey) {
            setCustomerAuth(parsedAuth);
            return;
          }
        }
      } catch (error) {
        console.error("Error reading customer auth from localStorage:", error);
      }

      // No valid auth found
      setCustomerAuth({
        customerID: null,
        apiKey: null,
        isAuthenticated: false,
        customerData: null,
      });
    };

    initializeAuth();
  }, []);

  // Update customer data using useCallback to prevent infinite re-renders
  const updateCustomerData = useCallback((data) => {
    setCustomerAuth((prevAuth) => {
      const updatedAuth = {
        ...prevAuth,
        customerData: data,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAuth));
      return updatedAuth;
    });
  }, []);

  // Clear authentication
  const clearAuth = useCallback(() => {
    const clearedAuth = {
      customerID: null,
      apiKey: null,
      isAuthenticated: false,
      customerData: null,
    };
    setCustomerAuth(clearedAuth);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Set authentication manually
  const setAuth = useCallback((customerID, apiKey, customerData = null) => {
    const authData = {
      customerID,
      apiKey,
      isAuthenticated: true,
      customerData,
    };
    setCustomerAuth(authData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
  }, []);

  return {
    ...customerAuth,
    updateCustomerData,
    clearAuth,
    setAuth,
  };
};
