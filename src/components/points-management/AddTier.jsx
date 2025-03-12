import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import { useTiers } from "../../hooks/useTiers";
import useUiStore from "../../store/ui";

const AddTier = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    points_required: "",
    isActive: true,
  });
  const { useCreateTier, useUpdateTier } = useTiers();
  const createMutation = useCreateTier();
  const updateMutation = useUpdateTier();
  const { addToast } = useUiStore();
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData?.data?.name,
        points_required: editData?.data?.points_required,
        isActive: editData?.data?.isActive,
      });
    }
  }, [editData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData) {
      updateMutation.mutate(
        {
          id: editData?.data?._id,
          tierData: formData,
        },
        {
          onSuccess: (data) => {
            addToast({
              type: "success",
              message: data?.message,
            });
            onSuccess?.();
            onClose?.();
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
          onSuccess?.();
          onClose?.();
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
        icon: "",
        description: "",
        tags: [],
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add New Tier</h2>
          <button
            onClick={() => {
              setFormData({
                name: "",
                points_required: "",
                isActive: true,
              });
              onClose();
            }}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tier Name
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
              Points Required
            </label>
            <input
              type="number"
              name="points_required"
              value={formData.points_required}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true",
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <StyledButton
              name={"Cancel"}
              onClick={() => {
                setFormData({
                  name: "",
                  points_required: "",
                  isActive: true,
                });
                onClose();
              }}
              variant="tertiary"
            />
            <StyledButton name={"Add Tier"} type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTier;
