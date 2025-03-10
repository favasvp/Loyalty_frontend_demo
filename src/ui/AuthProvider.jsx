import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Create context
const AuthContext = createContext(null);

// Auth Provider component
export function AuthProvider({ children }) {
  const auth = useAuth();
  const navigate = useNavigate();

  // Check for token and fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !auth.user) {
      // auth.useIsAuthenticated();
    }
  }, [auth]);

  // Redirect to login if not authenticated
  const requireAuth = (callback) => {
    if (!auth.isAuthenticated) {
      navigate("/", { replace: true });
      return null;
    }
    return callback();
  };

  return (
    <AuthContext.Provider value={{ ...auth, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use Auth context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
