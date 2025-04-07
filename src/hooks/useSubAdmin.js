import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import subAdminApi from "../api/sub-admin";
export function useSubAdmin() {
  const queryClient = useQueryClient();
  const useGetSubAdmin = () => {
    return useQuery({
      queryKey: ["subAdmins"],
      queryFn: () => subAdminApi.getSubAdmin(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useGetSubAdminById = (id) => {
    return useQuery({
      queryKey: ["subAdmins", id],
      queryFn: () => subAdminApi.getSubAdminById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useCreateSubAdmin = () => {
    return useMutation({
      mutationFn: (formData) => subAdminApi.createSubAdmin(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["subAdmins"] });
      },
    });
  };

  const useUpdateSubAdmin = () => {
    return useMutation({
      mutationFn: ({ id, formData }) =>
        subAdminApi.updateSubAdmin(id, formData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["subAdmins"] });
        queryClient.invalidateQueries({
          queryKey: ["subAdmins", variables.id],
        });
      },
    });
  };

  const useDeleteSubAdmin = () => {
    return useMutation({
      mutationFn: (id) => subAdminApi.deleteSubAdmin(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["subAdmins"] });
      },
    });
  };

  return {
    useCreateSubAdmin,
    useGetSubAdmin,
    useGetSubAdminById,
    useUpdateSubAdmin,
    useDeleteSubAdmin,
  };
}
