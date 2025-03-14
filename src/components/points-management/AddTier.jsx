import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import { useTiers } from "../../hooks/useTiers";
import useUiStore from "../../store/ui";

const tierSchema = z.object({
  name: z.string().min(1, "Tier name is required"),
  points_required: z
    .number()
    .nonnegative("Points required must be 0 or greater"),
  isActive: z.boolean(),
  description: z.array(z.string()).optional(),
});

const AddTier = ({ isOpen, onClose, editData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tierSchema),
    defaultValues: {
      name: "",
      points_required: "",
      isActive: true,
      description: [],
    },
  });

  const { useCreateTier, useUpdateTier } = useTiers();
  const createMutation = useCreateTier();
  const updateMutation = useUpdateTier();
  const { addToast } = useUiStore();

  useEffect(() => {
    if (editData) {
      reset({
        name: editData?.data?.name || "",
        points_required: editData?.data?.points_required || "",
        isActive: editData?.data?.isActive ?? true,
        description: editData?.data?.description || [],
      });
    }
  }, [editData, reset]);

  const onSubmit = async (formData) => {
    if (editData?.data) {
      updateMutation.mutate(
        {
          id: editData?.data?._id,
          tierData: formData,
        },
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
  const resetAndClose = () => {
    reset({
      name: "",
      points_required: "",
      isActive: true,
      description: [],
    });
    onClose();
  };
  if (!isOpen) return null;
  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1";
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {editData?.data ? "Edit Tier" : "Add New Tier"}
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
            <label className={labelClass}>Tier Name</label>
            <input {...register("name")} className={inputClass} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Points Required</label>
            <input
              type="number"
              {...register("points_required", { valueAsNumber: true })}
              className={inputClass}
            />
            {errors.points_required && (
              <p className="text-red-500 text-sm">
                {errors.points_required.message}
              </p>
            )}
          </div>

          {/* <div>
            <label className={labelClass}>Status</label>
            <select {...register("isActive")} className={inputClass}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div> */}

          <div>
            <label className={labelClass}>Description</label>
            {watch("description")?.map((desc, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => {
                    const newDesc = [...getValues("description")];
                    newDesc[index] = e.target.value;
                    setValue("description", newDesc);
                  }}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      "description",
                      watch("description").filter((_, i) => i !== index)
                    )
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setValue("description", [...watch("description"), ""])
              }
              className="text-green-600 hover:text-green-800 text-sm mt-2"
            >
              + Add Description
            </button>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <StyledButton
              name="Cancel"
              onClick={resetAndClose}
              variant="tertiary"
            />
            <StyledButton
              name={editData?.data ? "Update" : "Add Tier"}
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTier;
