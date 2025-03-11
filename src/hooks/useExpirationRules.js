import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import rulesAndExpirySettingsApi from "../api/redemption_rules";
import rulesAndRedemptionSettingsApi from "../api/expiration_rule";

export function useExpirationRules() {
  const queryClient = useQueryClient();

  // Get expiration rules
  const useGetExpirationRules = () => {
    return useQuery({
      queryKey: ["expirationRules"],
      queryFn: () => rulesAndRedemptionSettingsApi.getExpiration(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Update expiration rules
  const useUpdateExpirationRules = () => {
    return useMutation({
      mutationFn: (rulesData) =>
        rulesAndRedemptionSettingsApi.updateRules(rulesData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expirationRules"] });
      },
    });
  };

  return {
    useGetExpirationRules,
    useUpdateExpirationRules,
  };
}
