import { create } from "zustand";

// Offers and promotions store with Zustand - focused only on client-side state
const useOffersStore = create((set) => ({
  // Filter and sort preferences
  filters: {
    merchantOffers: {},
    activeOffers: {},
    redemptions: {},
  },

  sorting: {
    merchantOffers: { field: "createdAt", direction: "desc" },
    activeOffers: { field: "endDate", direction: "asc" },
    redemptions: { field: "createdAt", direction: "desc" },
  },

  // Pagination state
  pagination: {
    merchantOffers: { page: 1, limit: 10 },
    activeOffers: { page: 1, limit: 10 },
    redemptions: { page: 1, limit: 10 },
  },

  // View preferences
  viewMode: {
    merchantOffers: "grid",
    activeOffers: "grid",
    redemptions: "table",
  },

  // Selected offer ID for detail views
  selectedOfferId: null,

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

  setSelectedOfferId: (id) =>
    set({
      selectedOfferId: id,
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
export const selectPagination = (section) => (state) =>  state.pagination[section];
export const selectViewMode = (section) => (state) => state.viewMode[section];
export const selectSelectedOfferId = (state) => state.selectedOfferId;

export default useOffersStore;
