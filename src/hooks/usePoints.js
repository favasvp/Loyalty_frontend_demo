import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import pointsApi from "../api/points_criteria";
import usePointsStore, {
  selectFilters,
  selectSorting,
  selectPagination,
} from "../store/points";

// Custom hook for points management
export function usePoints() {
  const queryClient = useQueryClient();

  // Get UI state actions from Zustand
  const { setFilters, setSorting, setPagination, setViewMode, resetFilters } =
    usePointsStore();

  // Points criteria queries and mutations
  const usePointsCriteria = (customParams = {}) => {
    // Use selectors directly in the hook
    const filters = usePointsStore(selectFilters("criteria"));
    const sorting = usePointsStore(selectSorting("criteria"));
    const pagination = usePointsStore(selectPagination("criteria"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["pointsCriteria", params],
      queryFn: () => pointsApi.getPointsCriteria(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const usePointsCriteriaById = (id) => {
    return useQuery({
      queryKey: ["pointsCriteria", id],
      queryFn: () => pointsApi.getPointsCriteriaById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useCreatePointsCriteria = () => {
    return useMutation({
      mutationFn: (criteriaData) =>
        pointsApi.createPointsCriteria(criteriaData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pointsCriteria"] });
      },
    });
  };

  const useUpdatePointsCriteria = () => {
    return useMutation({
      mutationFn: ({ id, criteriaData }) =>
        pointsApi.updatePointsCriteria(id, criteriaData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["pointsCriteria"] });
        queryClient.invalidateQueries({
          queryKey: ["pointsCriteria", variables.id],
        });
      },
    });
  };

  const useDeletePointsCriteria = () => {
    return useMutation({
      mutationFn: (id) => pointsApi.deletePointsCriteria(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pointsCriteria"] });
      },
    });
  };

  // Transactions queries and mutations
  const useTransactions = (customParams = {}) => {
    // Use selectors directly in the hook
    const filters = usePointsStore(selectFilters("transactions"));
    const sorting = usePointsStore(selectSorting("transactions"));
    const pagination = usePointsStore(selectPagination("transactions"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["transactions", params],
      queryFn: () => pointsApi.getTransactions(params),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const useTransactionById = (id) => {
    return useQuery({
      queryKey: ["transactions", id],
      queryFn: () => pointsApi.getTransactionById(id),
      enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const useCreateTransaction = () => {
    return useMutation({
      mutationFn: (transactionData) =>
        pointsApi.createTransaction(transactionData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
    });
  };

  // Tiers queries and mutations
  const useTiers = (customParams = {}) => {
    // Use selectors directly in the hook
    const filters = usePointsStore(selectFilters("tiers"));
    const sorting = usePointsStore(selectSorting("tiers"));
    const pagination = usePointsStore(selectPagination("tiers"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["tiers", params],
      queryFn: () => pointsApi.getTiers(params),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  const useTierById = (id) => {
    return useQuery({
      queryKey: ["tiers", id],
      queryFn: () => pointsApi.getTierById(id),
      enabled: !!id,
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  const useCreateTier = () => {
    return useMutation({
      mutationFn: (tierData) => pointsApi.createTier(tierData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tiers"] });
      },
    });
  };

  const useUpdateTier = () => {
    return useMutation({
      mutationFn: ({ id, tierData }) => pointsApi.updateTier(id, tierData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["tiers"] });
        queryClient.invalidateQueries({ queryKey: ["tiers", variables.id] });
      },
    });
  };

  const useDeleteTier = () => {
    return useMutation({
      mutationFn: (id) => pointsApi.deleteTier(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tiers"] });
      },
    });
  };

  // Rules queries and mutations
  const useRules = () => {
    return useQuery({
      queryKey: ["rules"],
      queryFn: () => pointsApi.getRules(),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  const useUpdateRules = () => {
    return useMutation({
      mutationFn: (rulesData) => pointsApi.updateRules(rulesData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rules"] });
      },
    });
  };

  return {
    // UI state actions
    setFilters,
    setSorting,
    setPagination,
    setViewMode,
    resetFilters,

    // Points criteria hooks
    usePointsCriteria,
    usePointsCriteriaById,
    useCreatePointsCriteria,
    useUpdatePointsCriteria,
    useDeletePointsCriteria,

    // Transactions hooks
    useTransactions,
    useTransactionById,
    useCreateTransaction,

    // Tiers hooks
    useTiers,
    useTierById,
    useCreateTier,
    useUpdateTier,
    useDeleteTier,

    // Rules hooks
    useRules,
    useUpdateRules,
  };
}
