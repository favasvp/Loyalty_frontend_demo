import { useMutation, useQuery } from "@tanstack/react-query";
import authApi from "../api/auth";
import useAuthStore, { selectUser, selectIsAuthenticated } from "../store/auth";

// Custom hook for authentication
export function useAuth() {
  const user = useAuthStore(selectUser);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const { setAuth, clearAuth, updateUser } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      localStorage.setItem("token", data.token);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData) => authApi.register(userData),
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearAuth();
      localStorage.removeItem("token");
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (userData) => authApi.updateProfile(userData),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: (passwordData) => authApi.changePassword(passwordData),
  });

  // Current user query
  const { refetch: refetchUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const user = await authApi.getCurrentUser();
        setAuth(user, localStorage.getItem("token"));
        return user;
      } catch (error) {
        if (error.response?.status === 401) {
          clearAuth();
          localStorage.removeItem("token");
        }
        throw error;
      }
    },
    enabled: !!localStorage.getItem("token") && !user,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    // State
    user,
    isAuthenticated,

    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    refetchUser,

    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,

    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    updateProfileError: updateProfileMutation.error,
    changePasswordError: changePasswordMutation.error,
  };
}

//write an  example of implementing this is an email login page below 
/**
import { useState } from 'react';
import { useAuth } from './useAuth';

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, isLoggingIn, loginError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      setError(error.message);
    }
  };

      return (  
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
*/
