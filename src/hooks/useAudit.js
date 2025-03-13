import { useQuery } from "@tanstack/react-query";
import auditApi from "../api/audit";

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
  return {
    useGetAdminLogs,
    useGetLogById,
  };
}
