import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customersApi from "../api/customers";
import useCustomersStore, {
  selectFilters,
  selectSorting,
  selectPagination,
  selectSelectedCustomerId,
} from "../store/customers";

// Custom hook for customer management
export function useCustomers() {
  const queryClient = useQueryClient();

  // Get UI state actions from Zustand
  const {
    setFilters,
    setSorting,
    setPagination,
    setViewMode,
    resetFilters,
    setSelectedCustomerId,
  } = useCustomersStore();

  // Get selected customer ID
  const selectedCustomerId = useCustomersStore(selectSelectedCustomerId);

  // Customers queries and mutations
  const useCustomersList = (customParams = {}) => {
    // Use selectors directly in the hook
    const filters = useCustomersStore(selectFilters("customers"));
    const sorting = useCustomersStore(selectSorting("customers"));
    const pagination = useCustomersStore(selectPagination("customers"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["customers", params],
      queryFn: () => customersApi.getCustomers(params),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const useCustomerById = (id = selectedCustomerId) => {
    return useQuery({
      queryKey: ["customers", id],
      queryFn: () => customersApi.getCustomerById(id),
      enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const useCreateCustomer = () => {
    return useMutation({
      mutationFn: (customerData) => customersApi.createCustomer(customerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["customers"] });
      },
    });
  };

  const useUpdateCustomer = () => {
    return useMutation({
      mutationFn: ({ id, customerData }) =>
        customersApi.updateCustomer(id, customerData),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        queryClient.invalidateQueries({
          queryKey: ["customers", variables.id],
        });
      },
    });
  };

  const useDeleteCustomer = () => {
    return useMutation({
      mutationFn: (id) => customersApi.deleteCustomer(id),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        if (selectedCustomerId === variables) {
          setSelectedCustomerId(null);
        }
      },
    });
  };

  // Customer transactions queries
  const useCustomerTransactions = (
    customerId = selectedCustomerId,
    customParams = {}
  ) => {
    // Use selectors directly in the hook
    const filters = useCustomersStore(selectFilters("transactions"));
    const sorting = useCustomersStore(selectSorting("transactions"));
    const pagination = useCustomersStore(selectPagination("transactions"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["customers", customerId, "transactions", params],
      queryFn: () => customersApi.getCustomerTransactions(customerId, params),
      enabled: !!customerId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Customer points history queries
  const useCustomerPointsHistory = (
    customerId = selectedCustomerId,
    customParams = {}
  ) => {
    // Use selectors directly in the hook
    const filters = useCustomersStore(selectFilters("pointsHistory"));
    const sorting = useCustomersStore(selectSorting("pointsHistory"));
    const pagination = useCustomersStore(selectPagination("pointsHistory"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["customers", customerId, "points-history", params],
      queryFn: () => customersApi.getCustomerPointsHistory(customerId, params),
      enabled: !!customerId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Customer tier history queries
  const useCustomerTierHistory = (
    customerId = selectedCustomerId,
    customParams = {}
  ) => {
    // Use selectors directly in the hook
    const filters = useCustomersStore(selectFilters("tierHistory"));
    const sorting = useCustomersStore(selectSorting("tierHistory"));
    const pagination = useCustomersStore(selectPagination("tierHistory"));

    const params = {
      ...pagination,
      ...sorting,
      ...filters,
      ...customParams,
    };

    return useQuery({
      queryKey: ["customers", customerId, "tier-history", params],
      queryFn: () => customersApi.getCustomerTierHistory(customerId, params),
      enabled: !!customerId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Customer statistics queries
  const useCustomerStatistics = () => {
    return useQuery({
      queryKey: ["customers", "statistics"],
      queryFn: () => customersApi.getCustomerStatistics(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Import customers mutation
  const useImportCustomers = () => {
    return useMutation({
      mutationFn: (formData) => customersApi.importCustomers(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["customers"] });
      },
    });
  };

  // Export customers query
  const useExportCustomers = (params = {}) => {
    return useMutation({
      mutationFn: () => customersApi.exportCustomers(params),
    });
  };

  return {
    // UI state actions
    setFilters,
    setSorting,
    setPagination,
    setViewMode,
    resetFilters,
    setSelectedCustomerId,
    selectedCustomerId,

    // Customers hooks
    useCustomersList,
    useCustomerById,
    useCreateCustomer,
    useUpdateCustomer,
    useDeleteCustomer,

    // Customer details hooks
    useCustomerTransactions,
    useCustomerPointsHistory,
    useCustomerTierHistory,

    // Statistics hooks
    useCustomerStatistics,

    // Import/Export hooks
    useImportCustomers,
    useExportCustomers,
  };
}


//example for using the useCustomers hook
/**

import { useCustomers } from './useCustomers';

const { useCustomersList, useCustomerById, useCreateCustomer, useUpdateCustomer, useDeleteCustomer } = useCustomers();


const handleCreateCustomer = async (customerData) => {
  try {
    await createCustomer(customerData);
  } catch (error) {
    console.error('Error creating customer:', error);
  }
};

const handleUpdateCustomer = async (customerData) => {
  try {
    await updateCustomer(customerData);
  } catch (error) {
    console.error('Error updating customer:', error);
  }
};

const handleDeleteCustomer = async (customerId) => {
  try {
    await deleteCustomer(customerId);
  } catch (error) {
    console.error('Error deleting customer:', error);
  }
};

  return (
    <div>
        <h1>Customers</h1>
      <div>
        <h2>Customers List</h2>
        {isCustomersLoading ? (
          <p>Loading customers...</p>
        ) : (
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>{customer.name}</li>
            ))}
          </ul>
        )}
      </div>
        </div>
        <div>
            <h2>Customer Details</h2>
            {isCustomerLoading ? (
                <p>Loading customer...</p>
            ) : (
                <p>{customer.name}</p>
            )}
        </div>
        <div>
            <h2>Create Customer</h2>
            <form onSubmit={handleCreateCustomer}>
                <input type="text" value={customerData.name} onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} />
                <button type="submit">Create Customer</button>
            </form>
        </div>  
  );
};


*/
