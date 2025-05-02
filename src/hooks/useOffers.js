/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import offersApi from "../api/offers";

export function useOffers() {
  const queryClient = useQueryClient();
  const useCreateMerchantOffer = () => {
    return useMutation({
      mutationFn: (offerData) => offersApi.createMerchantOffer(offerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
        queryClient.invalidateQueries({ queryKey: ["activeOffers"] });
      },
    });
  };
  const useCreateBulkMerchantOffer = () => {
    return useMutation({
      mutationFn: (offerData) => offersApi.createBulkMerchantOffer(offerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
        queryClient.invalidateQueries({ queryKey: ["activeOffers"] });
      },
    });
  };
  const getMerchantOffers = (params) => {
    return useQuery({
      queryKey: ["merchantOffers", params],
      queryFn: () => offersApi.getMerchantOffers(params),
    });
  };
  const offterfById = (id) => {
    return useQuery({
      queryKey: ["merchantOffers", id],
      queryFn: () => offersApi.getMerchantOfferById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
  const updateMerchantOffer = () => {
    return useMutation({
      mutationFn: ({ id, offerData }) =>
        offersApi.updateMerchantOffer(id, offerData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
        queryClient.invalidateQueries({
          queryKey: ["merchantOffers", variables.id],
        });
      },
    });
  };
  const deleteMerchantOffer = () => {
    return useMutation({
      mutationFn: (id) => offersApi.deleteMerchantOffer(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["merchantOffers"] });
      },
    });
  };
  return {
    useCreateMerchantOffer,
    getMerchantOffers,
    offterfById,
    updateMerchantOffer,
    deleteMerchantOffer,
    useCreateBulkMerchantOffer,
  };
}
