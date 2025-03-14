import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const roleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  permissions: z
    .array(z.string())
    .nonempty("At least one permission is required"),
});

const AddRole = ({ isOpen, onClose, editData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  const { useCreateRoleSetting, useUpdateRoleSetting } = useRoleSettings();
  const createMutation = useCreateRoleSetting();
  const updateMutation = useUpdateRoleSetting();
  const { addToast } = useUiStore();

  useEffect(() => {
    if (editData) {
      reset({
        name: editData?.data?.name || "",
        description: editData?.data?.description || "",
        permissions: editData?.data?.permissions || [],
      });
    }
  }, [editData, reset]);

  const onSubmit = async (formData) => {
    if (editData?.data) {
      updateMutation.mutate(
        { id: editData?.data?._id, roleSettingData: formData },
        {
          onSuccess: (data) => {
            addToast({ type: "success", message: data?.message });

            resetAndClose();
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
          addToast({ type: "success", message: data?.message });

          resetAndClose();
        },
        onError: (error) => {
          addToast({ type: "error", message: error?.response?.data?.message });
        },
      });
    }
  };

  const handleRoleChange = (role) => {
    const permissions = watch("permissions");
    setValue(
      "permissions",
      permissions.includes(role)
        ? permissions.filter((r) => r !== role)
        : [...permissions, role]
    );
  };
  const resetAndClose = () => {
    reset({
      name: "",
      description: "",
      permissions: [],
    });
    onClose();
  };
  if (!isOpen) return null;
  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1";
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {editData ? "Edit Role" : "Add Role"}
          </h2>
          <button
            onClick={resetAndClose}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input type="text" {...register("name")} className={inputClass} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea {...register("description")} className={inputClass} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Assign Roles</label>
            <div className="grid grid-cols-3 gap-6 p-2">
              {rolesList.map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={watch("permissions").includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                  <span className="text-sm text-gray-700">{role}</span>
                </label>
              ))}
            </div>
            {errors.permissions && (
              <p className="text-red-500 text-sm">
                {errors.permissions.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <StyledButton
              name="Cancel"
              onClick={resetAndClose}
              variant="tertiary"
            />
            <StyledButton
              name={editData ? "Update Role" : "Add Role"}
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
