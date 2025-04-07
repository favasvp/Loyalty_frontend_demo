import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import rulesAndRedemptionSettingsApi from "../api/redemption_rules";

/**
 * Custom hook for redemption rules management using TanStack Query
 */
export function useRedemptionRules() {
  const queryClient = useQueryClient();

  // Get redemption rules
  const useGetRedemptionRules = () => {
    return useQuery({
      queryKey: ["redemptionRules"],
      queryFn: () => rulesAndRedemptionSettingsApi.getRules(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Update redemption rules
  const useCreateRedemptionRules = () => {
    return useMutation({
      mutationFn: (rulesData) =>
        rulesAndRedemptionSettingsApi.addRules(rulesData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["redemptionRules"] });
      },
    });
  };
  const useUpdateRedemptionRules = () => {
    return useMutation({
      mutationFn: ({ id, rulesData }) =>
        rulesAndRedemptionSettingsApi.updateRules(id, rulesData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["redemptionRules"] });
        queryClient.invalidateQueries({
          queryKey: ["redemptionRules", variables.id],
        });
      },
    });
  };
  const useGetRedmptionRulesByApp = (id) => {
    return useQuery({
      queryKey: ["redemptionRules", id],
      queryFn: () => rulesAndRedemptionSettingsApi.getRulesByAppId(id),
      enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };
  return {
    useGetRedemptionRules,
    useCreateRedemptionRules,
    useGetRedmptionRulesByApp,
    useUpdateRedemptionRules,
  };
}
