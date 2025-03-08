import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import coinConvertionRuleApi from "../api/coin_convertion_rule";

/**
 * Custom hook for coin conversion rule management using TanStack Query
 */
export function useCoinConvertionRule() {
  const queryClient = useQueryClient();

  // Get all coin conversion rules
  const useGetCoinConvertionRule = () => {
    return useQuery({
      queryKey: ["coinConvertionRule"],
      queryFn: () => coinConvertionRuleApi.getCoinConvertionRule(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get coin management by ID
  const useGetCoinManagementById = (id) => {
    return useQuery({
      queryKey: ["coinConvertionRule", id],
      queryFn: () => coinConvertionRuleApi.getCoinManagementById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create coin management
  const useCreateCoinManagement = () => {
    return useMutation({
      mutationFn: (coinManagementData) =>
        coinConvertionRuleApi.createCoinManagement(coinManagementData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["coinConvertionRule"] });
      },
    });
  };

  // Update coin management
  const useUpdateCoinManagement = () => {
    return useMutation({
      mutationFn: ({ id, coinManagementData }) =>
        coinConvertionRuleApi.updateCoinManagement(id, coinManagementData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["coinConvertionRule"] });
        queryClient.invalidateQueries({
          queryKey: ["coinConvertionRule", variables.id],
        });
      },
    });
  };

  // Reset coin conversion rule
  const useResetCoinConvertionRule = () => {
    return useMutation({
      mutationFn: () => coinConvertionRuleApi.resetCoinConvertionRule(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["coinConvertionRule"] });
      },
    });
  };

  return {
    useGetCoinConvertionRule,
    useGetCoinManagementById,
    useCreateCoinManagement,
    useUpdateCoinManagement,
    useResetCoinConvertionRule,
  };
}
