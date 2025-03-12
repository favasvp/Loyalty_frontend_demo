import {
  ArrowDownTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import StyledSearchInput from "../../ui/StyledSearchInput";
import { useMemo, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import RefreshButton from "../../ui/RefreshButton.jsx";
import Loader from "../../ui/Loader.jsx";
import { useTriggerEvents } from "../../hooks/useTriggerEvents.js";
import AddEvent from "../../components/reference-data/AddEvent.jsx";
import DeleteModal from "../../ui/DeleteModal.jsx";
import useUiStore from "../../store/ui.js";

const TriggerEvents = () => {
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editData, setEditData] = useState(null);
  const { useGetTriggerEvents, useGetTriggerEventById, useDeleteTriggerEvent } =
    useTriggerEvents();
  const {
    data: triggerEvents,
    isLoading,
    refetch,
    dataUpdatedAt,
  } = useGetTriggerEvents();
  const { data: triggerEventData } = useGetTriggerEventById(editData?.id);
  const deleteMutation = useDeleteTriggerEvent();
  const { addToast } = useUiStore();
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return triggerEvents?.data.slice(startIndex, startIndex + itemsPerPage);
  }, [triggerEvents, currentPage, itemsPerPage]);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  const handleEdit = (id) => {
    setEditData({ id });
    setAddOpen(true);
  };
  const handleDeleteOpen = async (id) => {
    setEditData( id );
    setDeleteOpen(true);
  };
  const handleSelectAll = () => {
    if (selectedRows.length === triggerEvents?.data?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(triggerEvents?.data?.map((item) => item?._id));
    }
  };
  const handleDelete = () => {
    deleteMutation.mutate(editData, {
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
    setEditData(null);
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
            Trigger Events
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
                <span className="text-lg leading-none">+</span> Add Event
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
                  checked={selectedRows.length === triggerEvents?.data.length}
                  className="cursor-pointer w-4 h-4 align-middle"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData?.map((item) => (
              <tr key={item?.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    onChange={() => handleRowSelect(item?._id)}
                    checked={selectedRows.includes(item?._id)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img
                    src={item?.icon}
                    alt="icon"
                    className="w-6 h-6 object-contain"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.description}
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
            ))}
          </tbody>
        </StyledTable>
      )}
      <AddEvent
        isOpen={addOpen}
        onClose={() => {
          setAddOpen(false);
          setEditData({});

        }}
        onSuccess={() => {
          setEditData({});
        }}
        editData={triggerEventData}
      />

      <DeleteModal
        data={"Trigger Event"}
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default TriggerEvents;
