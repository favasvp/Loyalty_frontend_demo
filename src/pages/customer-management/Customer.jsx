import {
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import StyledSearchInput from "../../ui/StyledSearchInput";
import { useState } from "react";

const Customer = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleEdit = () => {};
  const data = [
    { id: 1, name: "John Doe", pointsRequired: 120, status: "Active" },
    { id: 2, name: "Jane Smith", pointsRequired: 90, status: "Inactive" },
    { id: 3, name: "Alice Johnson", pointsRequired: 150, status: "Active" },
    { id: 4, name: "Michael Brown", pointsRequired: 80, status: "Pending" },
    { id: 5, name: "Emily Davis", pointsRequired: 110, status: "Active" },
  ];

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Customers
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
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
            //   onClick={() => {
            //     setOpen(true);
            //   }}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200 w-full">
            <thead className="bg-gray-50 w-full">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === data.length}
                    className="cursor-pointer w-4 h-4 align-middle"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      onChange={() => handleRowSelect(item.id)}
                      checked={selectedRows.includes(item.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.pointsRequired}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50"
                        onClick={() => handleEdit(item.id)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                        onClick={() => setDeleteOpen(true)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full bg-gray-50 border-t border-gray-200 px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex justify-between items-center w-full sm:w-auto gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 text-xs">Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1 border rounded text-gray-700 bg-white text-sm"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              {selectedRows.length > 0 && (
                <StyledButton
                  variant="delete"
                  name={
                    <>
                      <TrashIcon className="w-4 h-4" /> Delete
                    </>
                  }
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg transition-all text-xs ${
                  currentPage === 1
                    ? "text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-1">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded-lg transition-all text-xs ${
                      index + 1 === currentPage
                        ? "bg-green-600 text-white font-semibold"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg transition-all text-xs ${
                  currentPage === totalPages
                    ? "text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>

              {/* Delete Button */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
