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


/*
import { useRoleSettings } from '../hooks/useRoleSettings';
import { useQueryClient } from '@tanstack/react-query';

function RoleSettingsList() {
  const { useGetRoleSettings, useUpdateRoleSetting } = useRoleSettings();
  const queryClient = useQueryClient();
  
  // Fetch role settings
  const { data: roleSettings, isLoading, error } = useGetRoleSettings();
  
  // Set up update mutation
  const updateMutation = useUpdateRoleSetting();
  
  // Handle toggle
  const handleToggleActive = (id, currentValue) => {
    // Get current data from cache
    const previousData = queryClient.getQueryData(['roleSettings']);
    
    // Optimistically update the UI
    queryClient.setQueryData(['roleSettings'], old => 
      old.map(setting => 
        setting.id === id ? { ...setting, active: !currentValue } : setting
      )
    );
    
    // Send the update to the server
    updateMutation.mutate(
      {
        id,
        roleSettingData: { active: !currentValue }
      },
      {
        // If it fails, roll back to the previous data
        onError: () => {
          queryClient.setQueryData(['roleSettings'], previousData);
        }
      }
    );
  };
  
  if (isLoading) return <div>Loading role settings...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Role Settings</h2>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {roleSettings?.map((setting) => (
            <li key={setting.id}>
              <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{setting.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleToggleActive(setting.id, setting.active)}
                    disabled={updateMutation.isPending}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      setting.active ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className="sr-only">Toggle active state</span>
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        setting.active ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoleSettingsList;

*/