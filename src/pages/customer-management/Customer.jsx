import {
  ArrowDownTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import StyledSearchInput from "../../ui/StyledSearchInput";
import { useEffect, useMemo, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import AddCustomer from "../../components/customer-management/AddCustomer.jsx";
import DeleteModal from "../../ui/DeleteModal";
import RefreshButton from "../../ui/RefreshButton.jsx";
import Loader from "../../ui/Loader.jsx";
import { useCustomers } from "../../hooks/useCustomers.js";
import useUiStore from "../../store/ui.js";

const Customer = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState(null);
  const { useGetCustomers, useDeleteCustomer, useGetCustomerById } =
    useCustomers();
  const { data: customerData } = useGetCustomerById(data?.id);

  const {
    data: customers,
    isLoading,
    error,
    refetch,
    dataUpdatedAt,
  } = useGetCustomers({ page: currentPage, limit: itemsPerPage });
  const deleteMutation = useDeleteCustomer();
  const { addToast } = useUiStore();
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return customers?.data?.customers?.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [customers?.data, currentPage, itemsPerPage]);
  useEffect(() => {
    if (customers?.data?.pagination?.total !== undefined) {
      setTotalCount(customers?.data?.pagination?.total);
    }
  }, [customers]);
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  const handleEdit = (id) => {
    setData({ id });
    setAddOpen(true);
  };
  const handleDeleteOpen = async (id) => {
    setData(id);
    setDeleteOpen(true);
  };
  const handleDelete = () => {
    deleteMutation.mutate(data, {
      onSuccess: (response) => {
        addToast({
          type: "success",
          message: response?.message,
        });
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: error?.response?.data?.message,
        });
      },
    });
    setDeleteOpen(false);
    setData(null);
  };
  const handleSelectAll = () => {
    const allRowIds = paginatedData?.map((item) => item?._id) || [];
    if (selectedRows.length === allRowIds?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allRowIds);
    }
  };
  const handleBulkDelete = async () => {
    if (!selectedRows.length) return;
    await Promise.all(
      selectedRows.map((id) =>
        deleteMutation.mutateAsync(id, {
          onSuccess: () => {
            addToast({
              type: "success",
              message: `Item deleted successfully!`,
            });
          },
          onError: (error) => {
            addToast({
              type: "error",
              message: error?.response?.data?.message,
            });
          },
        })
      )
    );

    setSelectedRows([]);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          {" "}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Customers
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {" "}
            Last Updated: {new Date(dataUpdatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
          <RefreshButton
            onClick={() => {
              refetch();
            }}
            isLoading={isLoading}
          />
          <StyledSearchInput
            placeholder="Search"
            className="w-full sm:w-auto"
          />
          <StyledButton
            name={
              <>
                <ArrowDownTrayIcon className="w-4 h-4" /> Export{" "}
              </>
            }
            variant="download"
          />
          <StyledButton
            name={
              <>
                <span className="text-lg leading-none">+</span> Add Customer
              </>
            }
            onClick={() => {
              setAddOpen(true);
            }}
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <StyledTable
          paginationProps={{
            currentPage,
            totalCount,
            itemsPerPage,
            setCurrentPage,
            setItemsPerPage,
            selectedRows,
            handleBulkDelete,
          }}
        >
          <thead className="bg-gray-50 w-full">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    paginatedData?.length > 0 &&
                    paginatedData.every((item) =>
                      selectedRows?.includes(item._id)
                    )
                  }
                  className="cursor-pointer w-4 h-4 align-middle"
                />
              </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Total Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Login Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData?.length > 0 ? (
              paginatedData?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      onChange={() => handleRowSelect(item?.id)}
                      checked={selectedRows.includes(item?.id)}
                      className="cursor-pointer"
                    />
                  </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.customer_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.name}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.total_points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item?.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item?.tier?.name?.en}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item?.app_type?.map((type, index) => (
                      <span
                        key={index}
                        className="mr-2 px-2 py-1 bg-gray-200 text-gray-700  rounded-lg"
                      >
                        {type.name}
                      </span>
                    ))}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item?.status
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {item?.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-slate-400 hover:text-green-700 p-1 rounded-lg hover:bg-green-50"
                        onClick={() => handleEdit(item?._id)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-slate-400 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                        onClick={() => handleDeleteOpen(item?._id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      )}
      <AddCustomer
        isOpen={addOpen}
        onClose={() => {
          setAddOpen(false);
          setData(null);
        }}
        editData={customerData}
      />
      <DeleteModal
        data={"Customer"}
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Customer;
