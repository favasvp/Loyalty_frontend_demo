/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import offersApi from "../api/offers";
import useOffersStore, {
  selectFilters,
  selectSorting,
  selectPagination,
  selectSelectedOfferId,
} from "../store/offers";

/**
 * Custom hook for offers management using TanStack Query
 */
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

  // Get all merchant offers
  const useGetMerchantOffers = (params = {}) => {
    return useQuery({
      queryKey: ["merchantOffers", params],
      queryFn: () => offersApi.getMerchantOffers(params),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get merchant offer by ID
  const useGetMerchantOfferById = (id) => {
    return useQuery({
      queryKey: ["merchantOffers", id],
      queryFn: () => offersApi.getMerchantOfferById(id),
      enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Create merchant offer
  const useCreateMerchantOffer = () => {
    return useMutation({
      mutationFn: (offerData) => offersApi.createMerchantOffer(offerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
        queryClient.invalidateQueries({ queryKey: ["activeOffers"] });
      },
    });
  };

  // Update merchant offer
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

  // Delete merchant offer
  const useDeleteMerchantOffer = () => {
    return useMutation({
      mutationFn: (id) => offersApi.deleteMerchantOffer(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
        queryClient.invalidateQueries({ queryKey: ["activeOffers"] });
      },
    });
  };

  // Get active offers
  const useGetActiveOffers = () => {
    return useQuery({
      queryKey: ["activeOffers"],
      queryFn: () => offersApi.getActiveOffers(),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get offers by category
  const useGetOffersByCategory = (categoryId) => {
    return useQuery({
      queryKey: ["offersByCategory", categoryId],
      queryFn: () => offersApi.getOffersByCategory(categoryId),
      enabled: !!categoryId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get offers by brand
  const useGetOffersByBrand = (brandId) => {
    return useQuery({
      queryKey: ["offersByBrand", brandId],
      queryFn: () => offersApi.getOffersByBrand(brandId),
      enabled: !!brandId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Redeem offer
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

  // Get offer redemption history
  const useGetOfferRedemptionHistory = (offerId, params = {}) => {
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
    useGetMerchantOffers,
    useGetMerchantOfferById,
    useCreateMerchantOffer,
    useUpdateMerchantOffer,
    useDeleteMerchantOffer,

    // Active offers hooks
    useGetActiveOffers,

    // Offers by category/brand hooks
    useGetOffersByCategory,
    useGetOffersByBrand,

    // Redemption hooks
    useRedeemOffer,
    useGetOfferRedemptionHistory,
  };
}
