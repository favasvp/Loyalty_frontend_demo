import React, { useState } from "react";
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
  const [data, setData] = useState(null);

  const { useGetRoleSettings, useDeleteRoleSetting, useGetRoleSettingById } =
    useRoleSettings();

  const { data: roleData } = useGetRoleSettingById(data?.id);
  const {
    data: roleSettings,
    isLoading,
    refetch,
    dataUpdatedAt,
  } = useGetRoleSettings();

  const deleteMutation = useDeleteRoleSetting();
  const { addToast } = useUiStore();

  const handleDeleteOpen = (id) => {
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

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const DisplayPermissionsGrid = ({ permissions }) => {
    return (
      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-3">Permissions</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {permissions?.map((perm, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                key={index}
                className="inline-flex items-center bg-gray-50 text-gray-700 px-2 py-1 text-xs rounded-md"
              >
                {perm}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Role & Access Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Last Updated: {formatDate(dataUpdatedAt)}
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <RefreshButton onClick={refetch} isLoading={isLoading} />
          <StyledButton
            name={
              <span className="flex items-center gap-2">
                <PlusIcon className="w-4 h-4" /> Add Role
              </span>
            }
            onClick={() => setAddOpen(true)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : (
        <div className="space-y-8">
          {roleSettings?.data?.map((role) => (
            <div
              key={role?._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {role?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {role?.description}
                  </p>
                </div>
                <div className="flex space-x-2 ml-3">
                  <button
                    className="text-gray-400 hover:text-green-600 p-1.5 rounded-md hover:bg-green-50 transition-colors"
                    onClick={() => handleEdit(role?._id)}
                    aria-label="Edit role"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                    onClick={() => handleDeleteOpen(role?._id)}
                    aria-label="Delete role"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <DisplayPermissionsGrid permissions={role?.permissions} />
            </div>
          ))}
        </div>
      )}

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
  );
};

export default Role;
