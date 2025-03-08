import { create } from "zustand";
import { persist } from "zustand/middleware";

// Auth store with Zustand - focused only on client-side auth state
const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,

      // Actions
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // name for the localStorage key
      partialize: (state) => ({ token: state.token, user: state.user }), // only persist these fields
    }
  )
);

// Selectors
export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.isAuthenticated;
export const selectToken = (state) => state.token;

export default useAuthStore;
