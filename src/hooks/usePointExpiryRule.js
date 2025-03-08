import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import pointExpiryRuleApi from "../api/point_expiry_rule";

/**
 * Custom hook for point expiry rule management using TanStack Query
 */
export function usePointExpiryRule() {
  const queryClient = useQueryClient();

  // Get all point expiry rules
  const useGetPointExpiryRules = () => {
    return useQuery({
      queryKey: ["pointExpiryRules"],
      queryFn: () => pointExpiryRuleApi.getPointExpiryRules(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create or update point expiry rule
  const useCreateOrUpdatePointExpiryRule = () => {
    return useMutation({
      mutationFn: (pointExpiryRule) =>
        pointExpiryRuleApi.createOrUpdatePointExpiryRule(pointExpiryRule),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pointExpiryRules"] });
      },
    });
  };

  // Get user information with point expiration
  const useGetUserInformationWithPointExpiration = (userId) => {
    return useQuery({
      queryKey: ["pointExpiryRules", "user", userId, "expiring-soon"],
      queryFn: () =>
        pointExpiryRuleApi.getUserInformationWithPointExpiration(userId),
      enabled: !!userId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  return {
    useGetPointExpiryRules,
    useCreateOrUpdatePointExpiryRule,
    useGetUserInformationWithPointExpiration,
  };
}
