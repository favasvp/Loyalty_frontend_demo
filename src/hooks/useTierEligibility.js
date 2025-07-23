import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tierEligibilityApi from "../api/tier_eligibility";

const QUERY_KEYS = {
  tierEligibility: "tier-eligibility",
  tierEligibilityById: (id) => ["tier-eligibility", id],
  criteriaForTier: (tierId, appType) => ["tier-eligibility", "tier", tierId, appType],
};

export const useTierEligibility = () => {
  const queryClient = useQueryClient();

  // Get all tier eligibility criteria
  const useGetTierEligibilityCriteria = (params = {}) => {
    return useQuery({
      queryKey: [QUERY_KEYS.tierEligibility, params],
      queryFn: () => tierEligibilityApi.getTierEligibilityCriteria(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get tier eligibility criteria by ID
  const useGetTierEligibilityCriteriaById = (id) => {
    return useQuery({
      queryKey: QUERY_KEYS.tierEligibilityById(id),
      queryFn: () => tierEligibilityApi.getTierEligibilityCriteriaById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    });
  };

  // Get criteria for specific tier
  const useGetCriteriaForTier = (tierId, appType = null) => {
    return useQuery({
      queryKey: QUERY_KEYS.criteriaForTier(tierId, appType),
      queryFn: () => tierEligibilityApi.getCriteriaForTier(tierId, appType),
      enabled: !!tierId,
      staleTime: 5 * 60 * 1000,
    });
  };

  // Create tier eligibility criteria
  const useCreateTierEligibilityCriteria = () => {
    return useMutation({
      mutationFn: tierEligibilityApi.createTierEligibilityCriteria,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.tierEligibility],
        });
      },
    });
  };

  // Update tier eligibility criteria
  const useUpdateTierEligibilityCriteria = () => {
    return useMutation({
      mutationFn: ({ id, data }) => tierEligibilityApi.updateTierEligibilityCriteria(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.tierEligibility],
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.tierEligibilityById(id),
        });
      },
    });
  };

  // Delete tier eligibility criteria
  const useDeleteTierEligibilityCriteria = () => {
    return useMutation({
      mutationFn: tierEligibilityApi.deleteTierEligibilityCriteria,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.tierEligibility],
        });
      },
    });
  };

  return {
    useGetTierEligibilityCriteria,
    useGetTierEligibilityCriteriaById,
    useGetCriteriaForTier,
    useCreateTierEligibilityCriteria,
    useUpdateTierEligibilityCriteria,
    useDeleteTierEligibilityCriteria,
  };
}; 