import {
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import DeleteModal from "../../ui/DeleteModal";
import ViewAdmin from "../../components/system-and-settings/ViewAdmin";
import StyledSearchInput from "../../ui/StyledSearchInput";
import StyledButton from "../../ui/StyledButton";

const Users = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleEdit = () => {};
  const data = [
    { id: 1, name: "John Doe", pointsRequired: 120, status: "Active" },
    { id: 2, name: "Jane Smith", pointsRequired: 90, status: "Inactive" },
    { id: 3, name: "Alice Johnson", pointsRequired: 150, status: "Active" },
    { id: 4, name: "Michael Brown", pointsRequired: 80, status: "Pending" },
    { id: 5, name: "Emily Davis", pointsRequired: 110, status: "Active" },
  ];
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data?.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);
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
        <div>
          {" "}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            User Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage system users and their access
          </p>
        </div>
      </div>{" "}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <StyledSearchInput placeholder="Search" className="w-full sm:w-auto" />

        <div className="flex gap-3 ml-auto">
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
            onClick={() => setAddOpen(true)}
          />
        </div>
      </div>
      <StyledTable
        paginationProps={{
          currentPage,
          totalCount,
          itemsPerPage,
          setCurrentPage,
          setItemsPerPage,
          selectedRows,
        }}
      >
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
          {paginatedData?.map((item) => (
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
                    className="text-blue-600 hover:text-blue-700 p-1 rounded-lg hover:bg-blue-50"
                    onClick={() => setViewOpen(true)}
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
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
      </StyledTable>
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        data={"User"}
      />
      <ViewAdmin isOpen={viewOpen} onClose={() => setViewOpen(false)} />
    </>
  );
};

export default Users;
