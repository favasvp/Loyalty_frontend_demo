import { create } from "zustand";

// Customers management store with Zustand - focused only on client-side state
const useCustomersStore = create((set) => ({
  // Filter and sort preferences
  filters: {
    customers: {},
    transactions: {},
    pointsHistory: {},
    tierHistory: {},
  },

  sorting: {
    customers: { field: "createdAt", direction: "desc" },
    transactions: { field: "createdAt", direction: "desc" },
    pointsHistory: { field: "createdAt", direction: "desc" },
    tierHistory: { field: "createdAt", direction: "desc" },
  },

  // Pagination state
  pagination: {
    customers: { page: 1, limit: 10 },
    transactions: { page: 1, limit: 10 },
    pointsHistory: { page: 1, limit: 10 },
    tierHistory: { page: 1, limit: 10 },
  },

  // View preferences
  viewMode: {
    customers: "table",
    transactions: "table",
    pointsHistory: "table",
    tierHistory: "table",
  },

  // Selected customer ID for detail views
  selectedCustomerId: null,

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

  setSelectedCustomerId: (id) =>
    set({
      selectedCustomerId: id,
    }),

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
export const selectSelectedCustomerId = (state) => state.selectedCustomerId;

export default useCustomersStore;
