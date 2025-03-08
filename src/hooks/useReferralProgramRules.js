import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import referralProgramRulesApi from "../api/referral_program_rules";

/**
 * Custom hook for referral program rules management using TanStack Query
 */
export function useReferralProgramRules() {
  const queryClient = useQueryClient();

  // Get all referral program rules
  const useGetReferralProgramRules = () => {
    return useQuery({
      queryKey: ["referralProgramRules"],
      queryFn: () => referralProgramRulesApi.getReferralProgramRules(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create referral program rule
  const useCreateReferralProgramRule = () => {
    return useMutation({
      mutationFn: (referralProgramRuleData) =>
        referralProgramRulesApi.createReferralProgramRule(
          referralProgramRuleData
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["referralProgramRules"] });
      },
    });
  };

  // Update referral program rule
  const useUpdateReferralProgramRule = () => {
    return useMutation({
      mutationFn: ({ id, referralProgramRuleData }) =>
        referralProgramRulesApi.updateReferralProgramRule(
          id,
          referralProgramRuleData
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["referralProgramRules"] });
      },
    });
  };

  // Delete referral program rule
  const useDeleteReferralProgramRule = () => {
    return useMutation({
      mutationFn: (id) => referralProgramRulesApi.deleteReferralProgramRule(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["referralProgramRules"] });
      },
    });
  };

  return {
    useGetReferralProgramRules,
    useCreateReferralProgramRule,
    useUpdateReferralProgramRule,
    useDeleteReferralProgramRule,
  };
}
