import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import categoryApi from "../api/category";


export function useCategory() {
  const queryClient = useQueryClient();

 
  const useGetCategory = () => {
    return useQuery({
      queryKey: ["category"],
      queryFn: () => categoryApi.getCategory(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useGetCategoryById = (id) => {
    return useQuery({
      queryKey: ["category", id],
      queryFn: () => categoryApi.getCategoryById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useCreateCategory = () => {
    return useMutation({
      mutationFn: (formData) => categoryApi.createCategory(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
      },
    });
  };

  const useUpdateCategory = () => {
    return useMutation({
      mutationFn: ({ id, formData }) => categoryApi.updateCategory(id, formData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
        queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
      },
    });
  };

  const useDeleteCategory = () => {
    return useMutation({
      mutationFn: (id) => categoryApi.deleteCategory(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
      },
    });
  };

  return {
    useGetCategory,
    useGetCategoryById,
    useCreateCategory,
    useUpdateCategory,
    useDeleteCategory,
  };
}
