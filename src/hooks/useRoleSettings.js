import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import roleSettingsApi from "../api/role_settings";

/**
 * Custom hook for role settings management using TanStack Query
 */
export function useRoleSettings() {
  const queryClient = useQueryClient();

  // Get all role settings
  const useGetRoleSettings = () => {
    return useQuery({
      queryKey: ["roleSettings"],
      queryFn: () => roleSettingsApi.getRoleSettings(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get role setting by ID
  const useGetRoleSettingById = (id) => {
    return useQuery({
      queryKey: ["roleSettings", id],
      queryFn: () => roleSettingsApi.getRoleSettingById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create role setting
  const useCreateRoleSetting = () => {
    return useMutation({
      mutationFn: (roleSettingData) =>
        roleSettingsApi.createRoleSetting(roleSettingData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roleSettings"] });
      },
    });
  };

  // Update role setting
  const useUpdateRoleSetting = () => {
    return useMutation({
      mutationFn: ({ id, roleSettingData }) =>
        roleSettingsApi.updateRoleSetting(id, roleSettingData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["roleSettings"] });
        queryClient.invalidateQueries({
          queryKey: ["roleSettings", variables.id],
        });
      },
    });
  };

  // Delete role setting
  const useDeleteRoleSetting = () => {
    return useMutation({
      mutationFn: (id) => roleSettingsApi.deleteRoleSetting(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roleSettings"] });
      },
    });
  };

  return {
    useGetRoleSettings,
    useGetRoleSettingById,
    useCreateRoleSetting,
    useUpdateRoleSetting,
    useDeleteRoleSetting,
  };
}
