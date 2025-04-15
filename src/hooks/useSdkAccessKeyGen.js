import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import sdkAccessKeyGenApi from "../api/sdk_access_key_gen";

/**
 * Custom hook for SDK access key generation using TanStack Query
 */
export function useSdkAccessKeyGen() {
  const queryClient = useQueryClient();

  // Get SDK access key
  const useGetSdkAccessKeyGen = (id) => {
    return useQuery({
      queryKey: ["sdkAccessKeyGen", id],
      queryFn: () => sdkAccessKeyGenApi.getSdkAccessKeyGen(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Generate SDK access key
  const useGenerateSdkAccessKey = () => {
    return useMutation({
      mutationFn: (sdkAccessKeyGenData) =>
        sdkAccessKeyGenApi.generateSdkAccessKey(sdkAccessKeyGenData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sdkAccessKeyGen"] });
      },
    });
  };

  // Update SDK access key
  const useUpdateSdkAccessKey = () => {
    return useMutation({
      mutationFn: (id) =>
        sdkAccessKeyGenApi.updateSdkAccessKey(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sdkAccessKeyGen"] });
      },
    });
  };

  // Delete SDK access key
  const useDeleteSdkAccessKey = () => {
    return useMutation({
      mutationFn: () => sdkAccessKeyGenApi.deleteSdkAccessKey(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sdkAccessKeyGen"] });
      },
    });
  };

  return {
    useGetSdkAccessKeyGen,
    useGenerateSdkAccessKey,
    useUpdateSdkAccessKey,
    useDeleteSdkAccessKey,
  };
}
