import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import pointsCriteriaApi from "../api/points_criteria";

/**
 * Custom hook for points criteria management using TanStack Query
 */
export function usePointsCriteria() {
  const queryClient = useQueryClient();

  // Get all points criteria
  const useGetPointsCriteria = () => {
    return useQuery({
      queryKey: ["pointsCriteria"],
      queryFn: () => pointsCriteriaApi.getPointsCriteria(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get points criteria by ID
  const useGetPointsCriteriaById = (id) => {
   return useQuery({
      queryKey: ["pointsCriteria", id],
      queryFn: () => pointsCriteriaApi.getPointsCriteriaById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create points criteria
  const useCreatePointsCriteria = () => {
    return useMutation({
      mutationFn: (criteriaData) =>
        pointsCriteriaApi.createPointsCriteria(criteriaData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pointsCriteria"] });
      },
    });
  };

  // Update points criteria
  const useUpdatePointsCriteria = () => {
    return useMutation({
      mutationFn: ({ id, criteriaData }) =>
        pointsCriteriaApi.updatePointsCriteria(id, criteriaData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["pointsCriteria"] });
        queryClient.invalidateQueries({
          queryKey: ["pointsCriteria", variables.id],
        });
      },
    });
  };

  // Delete points criteria
  const useDeletePointsCriteria = () => {
    return useMutation({
      mutationFn: (id) => pointsCriteriaApi.deletePointsCriteria(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pointsCriteria"] });
      },
    });
  };

  return {
    useGetPointsCriteria,
    useGetPointsCriteriaById,
    useCreatePointsCriteria,
    useUpdatePointsCriteria,
    useDeletePointsCriteria,
  };
}
