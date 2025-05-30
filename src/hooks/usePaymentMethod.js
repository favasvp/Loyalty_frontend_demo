import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import paymentMethodApi from "../api/payment-method";
export function usePaymentMethod() {
  const queryClient = useQueryClient();
  const useGetPaymentMethods = (params) => {
    return useQuery({
      queryKey: ["paymentMethods", params],
      queryFn: () => paymentMethodApi.getPaymentMethods(params),
      staleTime:0
    });
  };

  const useGetPaymentMethodById = (id) => {
    return useQuery({
      queryKey: ["paymentMethods", id],
      queryFn: () => paymentMethodApi.getPaymentMethodById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };
  const useCreatePaymentMethod = () => {
    return useMutation({
      mutationFn: (paymentMethodData) =>
        paymentMethodApi.createPaymentMethod(paymentMethodData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      },
    });
  };

  const useUpdatePaymentMethod = () => {
    return useMutation({
      mutationFn: ({ id, paymentMethodData }) =>
        paymentMethodApi.updatePaymentMethod(id, paymentMethodData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
        queryClient.invalidateQueries({
          queryKey: ["paymentMethods", variables.id],
        });
      },
    });
  };

  const useDeletePaymentMethod = () => {
    return useMutation({
      mutationFn: (id) => paymentMethodApi.deletePaymentMethod(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      },
    });
  };

  return {
    useGetPaymentMethods,
    useGetPaymentMethodById,
    useCreatePaymentMethod,
    useUpdatePaymentMethod,
    useDeletePaymentMethod,
  };
}
