import React, { useEffect, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRoleSettings } from "../../hooks/useRoleSettings";
import useUiStore from "../../store/ui";

const rolesList = [
  "VIEW_CUSTOMERS",
  "EDIT_CUSTOMERS",
  "DELETE_CUSTOMERS",
  "EXPORT_CUSTOMERS",
  "MANAGE_POINTS",
  "VIEW_POINTS_HISTORY",
  "ADJUST_POINTS",
  "MANAGE_CRITERIA",
  "CREATE_OFFERS",
  "EDIT_OFFERS",
  "DELETE_OFFERS",
  "MANAGE_REDEMPTIONS",
  "MANAGE_TIERS",
  "VIEW_TIERS",
  "ASSIGN_TIERS",
  "VIEW_REPORTS",
  "EXPORT_REPORTS",
  "MANAGE_ANALYTICS",
  "VIEW_DASHBOARD",
  "MANAGE_ROLES",
  "MANAGE_ADMINS",
  "VIEW_AUDIT_LOGS",
  "MANAGE_SETTINGS",
  "MANAGE_APP_TYPES",
];

const AddRole = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });
  const { useCreateRoleSetting, useUpdateRoleSetting } = useRoleSettings();
  const createMutation = useCreateRoleSetting();
  const updateMutation = useUpdateRoleSetting();
  const { addToast } = useUiStore();
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData?.data?.name || "",
        description: editData?.data?.description || "",
        permissions: editData?.data?.permissions || [],
      });
    }
  }, [editData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData?.data) {
      updateMutation.mutate(
        {
          id: editData?.data?._id,
          roleSettingData: formData,
        },
        {
          onSuccess: (data) => {
            addToast({
              type: "success",
              message: data?.message,
            });
            onClose();
          },
          onError: (error) => {
            addToast({
              type: "error",
              message: error?.response?.data?.message,
            });
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: (data) => {
          addToast({
            type: "success",
            message: data?.message,
          });
          onClose();
        },
        onError: (error) => {
          addToast({
            type: "error",
            message: error?.response?.data?.message,
          });
        },
      });

      setFormData({
        name: "",
        description: "",
        permissions: [],
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev?.permissions?.includes(role)
        ? prev?.permissions?.filter((r) => r !== role)
        : [...prev?.permissions, role],
    }));
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6  max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Role</h2>
          <button
            onClick={() => {
              onClose();
              setFormData({
                name: "",
                description: "",
                permissions: [],
              });
            }}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Roles
              </label>
              <div className="grid grid-cols-3 gap-6 p-2">
                {rolesList?.map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions?.includes(role)}
                      onChange={() => handleRoleChange(role)}
                    />
                    <span className="text-sm text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <StyledButton
                name="Cancel"
                onClick={() => {
                  onClose();
                  setFormData({
                    name: "",
                    description: "",
                    permissions: [],
                  });
                }}
                variant="tertiary"
              />
              <StyledButton name="Add Role" type="submit" variant="primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
