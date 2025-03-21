import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supportApi from "../api/support";

export function useSupport() {
  const queryClient = useQueryClient();

  const useGetSupport = () => {
    return useQuery({
      queryKey: ["supports"],
      queryFn: () => supportApi.getTickets(),
      staleTime: 5 * 60 * 1000,
    });
  };

  const useTicketById = (id) => {
    return useQuery({
      queryKey: ["supports", id],
      queryFn: () => supportApi.getTicketById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useAddMessage = () => {
    return useMutation({
      mutationFn: ({ id, data }) => supportApi.addMessage(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ["supports", id] }); // Invalidate specific ticket
      },
    });
  };
  const useUpdateStatus = () => {
    return useMutation({
      mutationFn: ({ id, data }) => supportApi.updateStatus(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ["supports", id] }); // Invalidate specific ticket
      },
    });
  };
  return {
    useGetSupport,
    useTicketById,
    useAddMessage,
    useUpdateStatus,
  };
}
