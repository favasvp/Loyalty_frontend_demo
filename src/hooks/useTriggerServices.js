import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import triggerServicesApi from "../api/trigger_services";

/**
 * Custom hook for trigger services management using TanStack Query
 */
export function useTriggerServices() {
  const queryClient = useQueryClient();

  // Get all trigger services
  const useGetTriggerServices = () => {
    return useQuery({
      queryKey: ["triggerServices"],
      queryFn: () => triggerServicesApi.getTriggerServices(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get trigger service by ID
  const useGetTriggerServiceById = (id) => {
    return useQuery({
      queryKey: ["triggerServices", id],
      queryFn: () => triggerServicesApi.getTriggerServiceById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get trigger service by trigger event ID
  const useGetTriggerServiceByTriggerEventId = (triggerEventId) => {
    return useQuery({
      queryKey: ["triggerServices", "triggerEvent", triggerEventId],
      queryFn: () =>
        triggerServicesApi.getTriggerServiceByTriggerEventId(triggerEventId),
      enabled: !!triggerEventId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Create trigger service
  const useCreateTriggerService = () => {
    return useMutation({
      mutationFn: (triggerServiceData) =>
        triggerServicesApi.createTriggerService(triggerServiceData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["triggerServices"] });
      },
    });
  };

  // Update trigger service
  const useUpdateTriggerService = () => {
    return useMutation({
      mutationFn: ({ id, triggerServiceData }) =>
        triggerServicesApi.updateTriggerService(id, triggerServiceData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["triggerServices"] });
        queryClient.invalidateQueries({
          queryKey: ["triggerServices", variables.id],
        });
      },
    });
  };

  // Delete trigger service
  const useDeleteTriggerService = () => {
    return useMutation({
      mutationFn: (id) => triggerServicesApi.deleteTriggerService(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["triggerServices"] });
      },
    });
  };

  return {
    useGetTriggerServices,
    useGetTriggerServiceById,
    useGetTriggerServiceByTriggerEventId,
    useCreateTriggerService,
    useUpdateTriggerService,
    useDeleteTriggerService,
  };
}
