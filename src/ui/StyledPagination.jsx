import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import StyledButton from "./StyledButton";

const StyledPagination = ({
  currentPage,
  totalCount,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
  selectedRows = [],
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
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
        <div className="flex items-center justify-center gap-2">
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

          <span className="text-gray-700 text-xs">
            Page {currentPage} of {totalPages}
          </span>

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
  );
};

export default StyledPagination;
