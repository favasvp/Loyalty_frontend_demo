import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import rulesAndExpirySettingsApi from "../api/redemption_rules";

/**
 * Custom hook for redemption rules management using TanStack Query
 */
export function useRedemptionRules() {
  const queryClient = useQueryClient();

  // Get redemption rules
  const useGetRedemptionRules = () => {
    return useQuery({
      queryKey: ["redemptionRules"],
      queryFn: () => rulesAndExpirySettingsApi.getRules(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Update redemption rules
  const useUpdateRedemptionRules = () => {
    return useMutation({
      mutationFn: (rulesData) =>
        rulesAndExpirySettingsApi.updateRules(rulesData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["redemptionRules"] });
      },
    });
  };

  return {
    useGetRedemptionRules,
    useUpdateRedemptionRules,
  };
}
