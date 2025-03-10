import { useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";

// Sample component that demonstrates how to use the refactored hooks
const CustomersList = () => {
  // Get UI state actions and data fetching hooks from our custom hook
  const {
    useCustomersList,
    setFilters,
    setSorting,
    setPagination,
    setSelectedCustomerId,
    selectedCustomerId,
    useCustomerById,
  } = useCustomers();

  // Local state for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Use the hook to fetch customers data
  const { data, isLoading, error, refetch } = useCustomersList({
    search: searchTerm,
  });

  // Use the hook to fetch selected customer details
  const { data: selectedCustomer, isLoading: isLoadingCustomer } =
    useCustomerById();

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters("customers", { search: searchTerm });
  };

  // Handle sorting
  const handleSort = (field) => {
    setSorting("customers", field, "asc");
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setPagination("customers", page, 10);
  };

  // Handle customer selection
  const handleSelectCustomer = (id) => {
    setSelectedCustomerId(id);
  };

  if (isLoading) return <div className="p-4">Loading customers...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Customers</h1>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers..."
            className="border border-gray-300 rounded px-3 py-1"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex gap-4">
        {/* Customers list */}
        <div className="w-2/3">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">
                  <button
                    onClick={() => handleSort("name")}
                    className="font-semibold"
                  >
                    Name
                  </button>
                </th>
                <th className="p-2 text-left border">
                  <button
                    onClick={() => handleSort("email")}
                    className="font-semibold"
                  >
                    Email
                  </button>
                </th>
                <th className="p-2 text-left border">
                  <button
                    onClick={() => handleSort("tier")}
                    className="font-semibold"
                  >
                    Tier
                  </button>
                </th>
                <th className="p-2 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.customers?.map((customer) => (
                <tr
                  key={customer.id}
                  className={`border hover:bg-gray-50 ${
                    selectedCustomerId === customer.id ? "bg-green-50" : ""
                  }`}
                >
                  <td className="p-2 border">{customer.name}</td>
                  <td className="p-2 border">{customer.email}</td>
                  <td className="p-2 border">{customer.tier}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleSelectCustomer(customer.id)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from(
              { length: Math.ceil((data?.total || 0) / 10) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>

        {/* Customer details */}
        <div className="w-1/3 border rounded p-4">
          {isLoadingCustomer ? (
            <div>Loading customer details...</div>
          ) : selectedCustomer ? (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {selectedCustomer.name}
              </h2>
              <p>
                <strong>Email:</strong> {selectedCustomer.email}
              </p>
              <p>
                <strong>Tier:</strong> {selectedCustomer.tier}
              </p>
              <p>
                <strong>Points:</strong> {selectedCustomer.points || 0}
              </p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(selectedCustomer.createdAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="text-gray-500">
              Select a customer to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
