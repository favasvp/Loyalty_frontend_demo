import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import StyledSearchInput from "../../ui/StyledSearchInput";
import { useMemo, useState } from "react";
import AddTier from "../../components/points-management/AddTier";
import StyledTable from "../../ui/StyledTable";
import DeleteModal from "../../ui/DeleteModal";
import RefreshButton from "../../ui/RefreshButton";
import Loader from "../../ui/Loader";
import { useTiers } from "../../hooks/useTiers";
import useUiStore from "../../store/ui";

const Tiers = () => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [data, setData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const { useGetTiers, useDeleteTier, useGetTierById } = useTiers();
  const { data: tierData } = useGetTierById(data?.id);
  const deleteMutation = useDeleteTier();
  const { addToast } = useUiStore();
  const {
    data: tiers,
    isLoading,

    refetch,
    dataUpdatedAt,
  } = useGetTiers();
  const handleEdit = (id) => {
    setData({ id });
    setOpen(true);
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
          message: response?.data?.message,
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
  const tableRows = useMemo(() => {
    return tiers?.data.map((item) => (
      <tr key={item?._id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item?.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item?.points_required}
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
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-rose-50 transition-colors"
              onClick={() => handleDeleteOpen(item?._id)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    ));
  }, [tiers?.data, handleEdit, setDeleteOpen]);
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            {" "}
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Tiers
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {" "}
              Last Updated: {new Date(dataUpdatedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
            <RefreshButton onClick={() => refetch()} isLoading={isLoading} />
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
            }}
          >
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
              {tableRows}
            </tbody>
          </StyledTable>
        )}
        <AddTier
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          editData={tierData}
        />

        <DeleteModal
          data={"Tier"}
          isOpen={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
          }}
          onConfirm={handleDelete}
        />
      </div>
    </>
  );
};

export default Tiers;
