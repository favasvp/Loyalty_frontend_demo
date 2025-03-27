import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const useCreateExpiration = () => {
    return useMutation({
      mutationFn: (formData) =>
        rulesAndRedemptionSettingsApi.addRules(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expirationRules"] });
      },
    });
  };
  // Update expiration rules
  const useUpdateExpirationRules = () => {
    return useMutation({
      mutationFn: ({ id, rulesData }) =>
        rulesAndRedemptionSettingsApi.updateRules(id, rulesData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["expirationRules"] });
        queryClient.invalidateQueries({
          queryKey: ["expirationRules", variables.id],
        });
      },
    });
  };
  const useGetExpirationByApp = (id) => {
    return useQuery({
      queryKey: ["expirationRules", id],
      queryFn: () => rulesAndRedemptionSettingsApi.getRulesByAppId(id),
      enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  return {
    useGetExpirationRules,
    useUpdateExpirationRules,
    useCreateExpiration,
    useGetExpirationByApp,
  };
}
