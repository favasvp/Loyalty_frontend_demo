import { create } from "zustand";
import { produce } from "immer";
import pointsApi from "../api/points_criteria";

// Points management store with Zustand - focused only on client-side state
const usePointsStore = create((set) => ({
  // Filter and sort preferences
  filters: {
    criteria: {},
    transactions: {},
    tiers: {},
  },

  sorting: {
    criteria: { field: "createdAt", direction: "desc" },
    transactions: { field: "createdAt", direction: "desc" },
    tiers: { field: "requiredPoints", direction: "asc" },
  },

  // Pagination state
  pagination: {
    criteria: { page: 1, limit: 10 },
    transactions: { page: 1, limit: 10 },
    tiers: { page: 1, limit: 10 },
  },

  // View preferences
  viewMode: {
    criteria: "grid",
    transactions: "table",
    tiers: "grid",
  },

  // Actions
  setFilters: (section, filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [section]: filters,
      },
    })),

  setSorting: (section, field, direction) =>
    set((state) => ({
      sorting: {
        ...state.sorting,
        [section]: { field, direction },
      },
    })),

  setPagination: (section, page, limit) =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        [section]: { page, limit },
      },
    })),

  setViewMode: (section, mode) =>
    set((state) => ({
      viewMode: {
        ...state.viewMode,
        [section]: mode,
      },
    })),

  resetFilters: (section) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [section]: {},
      },
    })),
}));

// Selectors
export const selectFilters = (section) => (state) => state.filters[section];
export const selectSorting = (section) => (state) => state.sorting[section];
export const selectPagination = (section) => (state) =>
  state.pagination[section];
export const selectViewMode = (section) => (state) => state.viewMode[section];

export default usePointsStore;
