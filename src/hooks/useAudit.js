import { useQuery } from "@tanstack/react-query";
import auditApi from "../api/audit";
import { use } from "react";

export function useAudits() {
  const useGetAdminLogs = (params) => {
    return useQuery({
      queryKey: ["logs", params],
      queryFn: () => auditApi.getAdminActions(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
  const useGetLogById = (id) => {
    return useQuery({
      queryKey: ["logs", id],
      queryFn: () => auditApi.getLogsById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
  const useSdkLogs = (params) => {
    return useQuery({
      queryKey: ["sdk-logs", params],
      queryFn: () => auditApi.getSdkLogs(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
  const useAuthLogs = (params) => {
    return useQuery({
      queryKey: ["auth-logs", params],
      queryFn: () => auditApi.getAuthLogs(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
  return {
    useGetAdminLogs,
    useGetLogById,
    useSdkLogs,
    useAuthLogs,
  };
}
