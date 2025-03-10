import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import transactionApi from "../api/transaction";

/**
 * Custom hook for transaction management using TanStack Query
 */
export function useTransaction() {
  const queryClient = useQueryClient();

  // Get all transactions
  const useGetTransactions = (params = {}) => {
    return useQuery({
      queryKey: ["transactions", params],
      queryFn: () => transactionApi.getTransactions(params),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get transaction by ID
  const useGetTransactionById = (id) => {
    return useQuery({
      queryKey: ["transactions", id],
      queryFn: () => transactionApi.getTransactionById(id),
      enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Create transaction
  const useCreateTransaction = () => {
    return useMutation({
      mutationFn: (transactionData) =>
        transactionApi.createTransaction(transactionData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
    });
  };

  return {
    useGetTransactions,
    useGetTransactionById,
    useCreateTransaction,
  };
}
