import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import StyledSearchInput from "../../ui/StyledSearchInput";
import { useState } from "react";
import AddTier from "../../components/points-management/AddTier";

const Tiers = () => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [editOpen, setEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleEdit = () => {
    setEditOpen(true);
  };
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Tiers
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
            <StyledSearchInput
              placeholder="Search"
              className="w-full sm:w-auto"
            />
            <StyledButton
              name={
                <>
                  <span className="text-lg leading-none">+</span> Add Tier
                </>
              }
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 w-full">
              <thead className="bg-gray-50 w-full">
                <tr>
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
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    name
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    pointsRequired
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full">
                      pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50"
                        onClick={handleEdit}
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
              </tbody>
            </table>
          </div>

          {/* Full-width Pagination */}
          <div className="w-full bg-gray-50 border-t border-gray-200 px-4 py-3">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
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
              </div>
            </div>
          </div>
        </div>

        <AddTier
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          onSuccess={() => {}}
        />
        {deleteOpen && (
          <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Confirm Deletion
              </h2>
              <p className="mt-4 text-gray-600 text-sm">
                Are you sure you want to delete this tier? This action cannot be
                undone.
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                <StyledButton
                  onClick={() => setDeleteOpen(false)}
                  name={"Cancel"}
                  variant="tertiary"
                />
                <StyledButton
                  onClick={() => setDeleteOpen(false)}
                  name={"Delete"}
                  variant="delete"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tiers;
