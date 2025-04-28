import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import { useTiers } from "../../hooks/useTiers";
import useUiStore from "../../store/ui";

const tierSchema = z.object({
  name: z.object({
    en: z.string().min(1, "English name is required"),
    ar:z.string().optional(),
  }),
  points_required: z
    .number()
    .nonnegative("Points required must be 0 or greater"),
  isActive: z.boolean(),
  description: z.object({
    en: z.array(z.string()).optional(),
    ar: z.array(z.string()).optional(),
  }),
});

const AddTier = ({ isOpen, onClose, editData }) => {
  const [activeLanguage, setActiveLanguage] = useState("en");

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
      name: { en: "", ar: "" },
      points_required: "",
      isActive: true,
      description: { en: [], ar: [] },
    },
  });

  const { useCreateTier, useUpdateTier } = useTiers();
  const createMutation = useCreateTier();
  const updateMutation = useUpdateTier();
  const { addToast } = useUiStore();
  useEffect(() => {
    if (editData) {
      setValue("name.en", editData?.data?.name?.en || "");
      setValue("name.ar", editData?.data?.name?.ar || "");
      setValue("points_required", editData?.data?.points_required || "");
      setValue("isActive", editData?.data?.isActive ?? true);
      setValue("description.en", editData?.data?.description?.en || []);
      setValue("description.ar", editData?.data?.description?.ar  || []);
    }
  }, [editData, setValue]);

  const onSubmit = async (formData) => {
    const action = editData?.data ? updateMutation : createMutation;
    const payload = editData?.data
      ? { id: editData.data._id, tierData: formData }
      : formData;

    action.mutate(payload, {
      onSuccess: (data) => {
        addToast({ type: "success", message: data?.message });
        reset({
          name: { en: "", ar: "" },
          points_required: "",
          isActive: true,
          description: { en: [], ar: [] },
        });
        onClose();
      },
      onError: (error) => {
        addToast({ type: "error", message: error?.response?.data?.message });
      },
    });
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-500";

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            {editData?.data ? "Edit Tier" : "Add New Tier"}
          </h2>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-500">
                  Points Required
                </label>
                <input
                  type="number"
                  
                  {...register("points_required", { valueAsNumber: true })}
                  className={inputClass}
                />
                {errors.points_required && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.points_required.message}
                  </p>
                )}
              </div>

              <div className="flex items-center pt-5">
                <input
                  type="checkbox"
                  id="isActive"
                  {...register("isActive")}
                  className="h-4 w-4 text-green-600 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="ml-2 text-sm text-gray-700"
                >
                  Active
                </label>
              </div>
            </div>

            <div className="flex border rounded overflow-hidden mb-2">
              <button
                type="button"
                onClick={() => setActiveLanguage("en")}
                className={`flex-1 py-2 text-sm font-medium ${
                  activeLanguage === "en"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-500"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguage("ar")}
                className={`flex-1 py-2 text-sm font-medium ${
                  activeLanguage === "ar"
                    ? "bg-green-50 text-green-700"
                    : "bg-white text-gray-500"
                }`}
              >
                Arabic
              </button>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500">
                Tier Name ({activeLanguage === "en" ? "English" : "Arabic"})
              </label>
              <input
                {...register(`name.${activeLanguage}`)}
                className={inputClass}
                value={watch(`name.${activeLanguage}`)}
                dir={activeLanguage === "ar" ? "rtl" : "ltr"}
              />
              {errors.name?.[activeLanguage] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name[activeLanguage].message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-gray-500">
                  Description ({activeLanguage === "en" ? "English" : "Arabic"})
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setValue(`description.${activeLanguage}`, [
                      ...(watch(`description.${activeLanguage}`) || []),
                      "",
                    ])
                  }
                  className="text-xs text-green-600 hover:text-green-800"
                >
                  + Add Item
                </button>
              </div>

              {watch(`description.${activeLanguage}`)?.map((desc, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    value={desc}
                    onChange={(e) => {
                      const newDesc = [
                        ...getValues(`description.${activeLanguage}`),
                      ];
                      newDesc[index] = e.target.value;
                      setValue(`description.${activeLanguage}`, newDesc);
                    }}
                    className={inputClass}
                    dir={activeLanguage === "ar" ? "rtl" : "ltr"}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        `description.${activeLanguage}`,
                        watch(`description.${activeLanguage}`).filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
            <StyledButton
              name="Cancel"
              onClick={() => {
                reset();
                onClose();
              }}
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
