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

  return {
    useCreateMerchantOffer,
  };
}
