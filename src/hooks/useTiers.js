import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tiersApi from "../api/tiers";

/**
 * Custom hook for tiers management using TanStack Query
 */
export function useTiers() {
  const queryClient = useQueryClient();

  // Get all tiers
  const useGetTiers = (params = {}) => {
    return useQuery({
      queryKey: ["tiers", params],
      queryFn: () => tiersApi.getTiers(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get tier by ID
  const useGetTierById = (id) => {
    return useQuery({
      queryKey: ["tiers", id],
      queryFn: () => tiersApi.getTierById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create tier
  const useCreateTier = () => {
    return useMutation({
      mutationFn: (tierData) => tiersApi.createTier(tierData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tiers"] });
      },
    });
  };

  // Update tier
  const useUpdateTier = () => {
    return useMutation({
      mutationFn: ({ id, tierData }) => tiersApi.updateTier(id, tierData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["tiers"] });
        queryClient.invalidateQueries({ queryKey: ["tiers", variables.id] });
      },
    });
  };

  // Delete tier
  const useDeleteTier = () => {
    return useMutation({
      mutationFn: (id) => tiersApi.deleteTier(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tiers"] });
      },
    });
  };

  return {
    useGetTiers,
    useGetTierById,
    useCreateTier,
    useUpdateTier,
    useDeleteTier,
  };
}
