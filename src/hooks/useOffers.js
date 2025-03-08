import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import offersApi from "../api/offers";
import useOffersStore, {
  selectFilters,
  selectSorting,
  selectPagination,
  selectSelectedOfferId,
} from "../store/offers";

// Custom hook for offers management
export function useOffers() {
  const queryClient = useQueryClient();

  // Get UI state actions from Zustand
  const {
    setFilters,
    setSorting,
    setPagination,
    setViewMode,
    resetFilters,
    setSelectedOfferId,
  } = useOffersStore();

  // Get selected offer ID
  const selectedOfferId = useOffersStore(selectSelectedOfferId);

  // Merchant offers queries and mutations
  const useMerchantOffers = (customParams = {}) => {
    // Use selectors directly in the hook
    const filters = useOffersStore(selectFilters("merchantOffers"));
    const sorting = useOffersStore(selectSorting("merchantOffers"));
    const pagination = useOffersStore(selectPagination("merchantOffers"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["merchantOffers", params],
      queryFn: () => offersApi.getMerchantOffers(params),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const useMerchantOfferById = (id = selectedOfferId) => {
    return useQuery({
      queryKey: ["merchantOffers", id],
      queryFn: () => offersApi.getMerchantOfferById(id),
      enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const useCreateMerchantOffer = () => {
    return useMutation({
      mutationFn: (offerData) => offersApi.createMerchantOffer(offerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
        queryClient.invalidateQueries({ queryKey: ["activeOffers"] });
      },
    });
  };

  const useUpdateMerchantOffer = () => {
    return useMutation({
      mutationFn: ({ id, offerData }) =>
        offersApi.updateMerchantOffer(id, offerData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
        queryClient.invalidateQueries({
          queryKey: ["merchantOffers", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: ["activeOffers"] });
      },
    });
  };

  const useDeleteMerchantOffer = () => {
    return useMutation({
      mutationFn: (id) => offersApi.deleteMerchantOffer(id),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
        queryClient.invalidateQueries({ queryKey: ["activeOffers"] });
        if (selectedOfferId === variables) {
          setSelectedOfferId(null);
        }
      },
    });
  };

  // Active offers queries
  const useActiveOffers = (customParams = {}) => {
    // Use selectors directly in the hook
    const filters = useOffersStore(selectFilters("activeOffers"));
    const sorting = useOffersStore(selectSorting("activeOffers"));
    const pagination = useOffersStore(selectPagination("activeOffers"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["activeOffers", params],
      queryFn: () => offersApi.getActiveOffers(params),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Offers by category queries
  const useOffersByCategory = (categoryId, customParams = {}) => {
    return useQuery({
      queryKey: ["offersByCategory", categoryId, customParams],
      queryFn: () => offersApi.getOffersByCategory(categoryId, customParams),
      enabled: !!categoryId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Offers by brand queries
  const useOffersByBrand = (brandId, customParams = {}) => {
    return useQuery({
      queryKey: ["offersByBrand", brandId, customParams],
      queryFn: () => offersApi.getOffersByBrand(brandId, customParams),
      enabled: !!brandId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Redeem offer mutation
  const useRedeemOffer = () => {
    return useMutation({
      mutationFn: ({ offerId, customerData }) =>
        offersApi.redeemOffer(offerId, customerData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["offerRedemptions", variables.offerId],
        });
      },
    });
  };

  // Offer redemptions queries
  const useOfferRedemptions = (
    offerId = selectedOfferId,
    customParams = {}
  ) => {
    // Use selectors directly in the hook
    const filters = useOffersStore(selectFilters("redemptions"));
    const sorting = useOffersStore(selectSorting("redemptions"));
    const pagination = useOffersStore(selectPagination("redemptions"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["offerRedemptions", offerId, params],
      queryFn: () => offersApi.getOfferRedemptionHistory(offerId, params),
      enabled: !!offerId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  return {
    // UI state actions
    setFilters,
    setSorting,
    setPagination,
    setViewMode,
    resetFilters,
    setSelectedOfferId,
    selectedOfferId,

    // Merchant offers hooks
    useMerchantOffers,
    useMerchantOfferById,
    useCreateMerchantOffer,
    useUpdateMerchantOffer,
    useDeleteMerchantOffer,

    // Active offers hooks
    useActiveOffers,

    // Offers by category/brand hooks
    useOffersByCategory,
    useOffersByBrand,

    // Redemption hooks
    useRedeemOffer,
    useOfferRedemptions,
  };
}
