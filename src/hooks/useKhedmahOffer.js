import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import khedmahofferApi from "../api/khedmahoffer";

export function useKhedmahOffer() {
  const queryClient = useQueryClient();
  const useCreateKhedmahOffer = () => {
    return useMutation({
      mutationFn: (offerData) => khedmahofferApi.addKhedmahOffer(offerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["khedmahOffers"] });
      },
    });
  };
  const getKhedmahOffers = () => {
    return useQuery({
      queryKey: ["khedmahOffers"],
      queryFn: khedmahofferApi.getKhedmahOffers,
    });
  };

  const khedmahofferById = (id) => {
    return useQuery({
      queryKey: ["khedmahOffers", id],
      queryFn: () => khedmahofferApi.getKhedmahOfferById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
  const updateKhedmahOffer = () => {
    return useMutation({
      mutationFn: ({id, data}) => khedmahofferApi.updateKhedmahOffer(id, data),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["khedmahOffers"] });
        queryClient.invalidateQueries({
          queryKey: ["khedmahOffers", variables.id],
        });
      },
    });
  };
  const deleteKhedmahOffer = () => {
    return useMutation({
      mutationFn: (id) => khedmahofferApi.deleteKhedmahOffer(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["khedmahOffers"] });
      },
    });
  };
  return {
    useCreateKhedmahOffer,
    getKhedmahOffers,
    khedmahofferById,
    deleteKhedmahOffer,
    updateKhedmahOffer,
  };
}
