import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import AddRole from "../../components/system-and-settings/AddRole";
import DeleteModal from "../../ui/DeleteModal";
import RefreshButton from "../../ui/RefreshButton";
import Loader from "../../ui/Loader";
import { useRoleSettings } from "../../hooks/useRoleSettings";
import useUiStore from "../../store/ui";

const Role = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { useGetRoleSettings, useDeleteRoleSetting, useGetRoleSettingById } =
    useRoleSettings();
  const [data, setData] = useState(null);
  const { data: roleData } = useGetRoleSettingById(data?.id);
  const {
    data: roleSettings,
    isLoading,
    refetch,
    dataUpdatedAt,
  } = useGetRoleSettings();
  const deleteMutation = useDeleteRoleSetting();
  const { addToast } = useUiStore();
  const handleDeleteOpen = async (id) => {
    setData(id);
    setDeleteOpen(true);
  };
  const handleEdit = (id) => {
    setData({ id });
    setAddOpen(true);
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
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Role & Access Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Last Updated: {new Date(dataUpdatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
          <RefreshButton onClick={() => refetch()} isLoading={isLoading} />
          <StyledButton
            name={
              <>
                <PlusIcon className="w-4 h-4" /> Add Role
              </>
            }
            onClick={() => setAddOpen(true)}
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roleSettings?.data?.map((role) => (
            <div
              key={role?._id}
              className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:border-indigo-100 hover:shadow transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium">{role?.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {role?.description}
                  </p>
                </div>
                <div className="flex space-x-1 ml-3">
                  <button
                    className="text-gray-400 hover:text-indigo-500 p-1.5 rounded-md hover:bg-indigo-50 transition-colors"
                    onClick={() => handleEdit(role?._id)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                    onClick={() => handleDeleteOpen(role?._id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  Permissions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {role?.permissions?.map((perm, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-50 text-gray-700 px-2 py-1 text-xs rounded-md"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <AddRole
            isOpen={addOpen}
            onClose={() => {
              setAddOpen(false);
              setData(null);
            }}
            editData={roleData}
          />
          <DeleteModal
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={handleDelete}
            data={"Role"}
          />
        </div>
      )}
    </>
  );
};

export default Role;
