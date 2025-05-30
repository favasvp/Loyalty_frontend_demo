import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import brandsApi from "../api/brands";

/**
 * Custom hook for brands management using TanStack Query
 */
export function useBrands() {
  const queryClient = useQueryClient();

  // Get all brands
  const useGetBrands = (params) => {
    return useQuery({
      queryKey: ["brands", params],
      queryFn: () => brandsApi.getBrands(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get brand by ID
  const useGetBrandById = (id) => {
    return useQuery({
      queryKey: ["brands", id],
      queryFn: () => brandsApi.getBrandById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create brand
  const useCreateBrand = () => {
    return useMutation({
      mutationFn: (formData) => brandsApi.createBrand(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      },
    });
  };

  // Update brand
  const useUpdateBrand = () => {
    return useMutation({
      mutationFn: ({ id, formData }) => brandsApi.updateBrand(id, formData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
        queryClient.invalidateQueries({ queryKey: ["brands", variables.id] });
      },
    });
  };

  // Delete brand
  const useDeleteBrand = () => {
    return useMutation({
      mutationFn: (id) => brandsApi.deleteBrand(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      },
    });
  };

  return {
    useGetBrands,
    useGetBrandById,
    useCreateBrand,
    useUpdateBrand,
    useDeleteBrand,
  };
}
