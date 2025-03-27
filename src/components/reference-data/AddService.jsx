import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import StyledButton from "../../ui/StyledButton";
import useUiStore from "../../store/ui";
import { useTriggerServices } from "../../hooks/useTriggerServices";
import { useTriggerEvents } from "../../hooks/useTriggerEvents";
import Select from "react-select";
import uploadApi from "../../api/upload";

const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  // icon: z.string().url("Invalid image URL"),
  triggerEvent: z
    .array(z.string())
    .nonempty("At least one event must be selected"),
});

const AddService = ({ isOpen, onClose, onSuccess, editData }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
      triggerEvent: [],
    },
  });

  const { useCreateTriggerService, useUpdateTriggerService } =
    useTriggerServices();
  const [imagePreview, setImagePreview] = useState(null);
  const createMutation = useCreateTriggerService();
  const updateMutation = useUpdateTriggerService();
  const { addToast } = useUiStore();
  const { useGetTriggerEvents } = useTriggerEvents();
  const { data: triggerEvents } = useGetTriggerEvents();

  useEffect(() => {
    if (editData?.data) {
      reset({
        title: editData.data.title || "",
        icon: editData.data.icon || "",
        description: editData.data.description || "",
        triggerEvent:
          editData.data.triggerEvent.map((event) => event._id) || [],
      });
      setImagePreview(editData?.data?.icon);
    }
  }, [editData, reset]);

  const onSubmit = async (formData) => {
    try {
      let imageUrl = formData.icon;
      const file = watch("icon");
      if (file instanceof File) {
        const uploadResponse = await uploadApi.uploadImage(file);
        imageUrl = uploadResponse.data?.url;
      }
      const formDataToSubmit = { ...formData, icon: imageUrl };
      if (editData) {
        updateMutation.mutate(
          { id: editData?.data?._id, triggerServiceData: formDataToSubmit },
          {
            onSuccess: (data) => {
              addToast({ type: "success", message: data?.message });
              onSuccess?.();
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
        createMutation.mutate(formDataToSubmit, {
          onSuccess: (data) => {
            addToast({ type: "success", message: data?.message });
            onSuccess?.();
            resetAndClose();
          },
          onError: (error) => {
            addToast({
              type: "error",
              message: error?.response?.data?.message,
            });
          },
        });
      }
    } catch (e) {
      addToast({ type: "error", message: e.message });
    }
  };
  const resetAndClose = () => {
    reset({
      title: "",
      description: "",
      icon: "",
      triggerEvent: [],
    });
    onClose();
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("icon", file);
    }
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
            {editData ? "Edit" : "Add Service"}
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
            <label className={labelClass}>Title</label>
            <input
              {...register("title")}
              placeholder="Enter Name"
              className={inputClass}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter description"
              className={inputClass}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Icon</label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer w-full border border-gray-200 rounded-lg px-3 py-3 flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">Choose Image</span>
              <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
            </label>
            {errors.icon && (
              <p className="text-red-500 text-sm">{errors.icon.message}</p>
            )}
          </div>

          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}
          <div>
            <label className={labelClass}>Trigger Event</label>
            <Select
              isMulti
              options={triggerEvents?.data?.map((event) => ({
                value: event._id,
                label: event.name,
              }))}
              value={triggerEvents?.data
                ?.filter((event) => watch("triggerEvent").includes(event._id))
                .map((event) => ({ value: event._id, label: event.name }))}
              onChange={(selectedOptions) =>
                setValue(
                  "triggerEvent",
                  selectedOptions.map((option) => option.value)
                )
              }
              className={`basic-multi-select`}
              classNamePrefix="select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "1px solid #E5E7EB",
                  borderRadius: "0.375rem",
                  padding: "2px",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#10B981",
                  },
                }),
              }}
            />

            {errors.triggerEvent && (
              <p className="text-red-500 text-sm">
                {errors.triggerEvent.message}
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
              name={editData ? "Edit" : "Add Service"}
              type="submit"
              variant="primary"
              disabled={createMutation.isLoading || updateMutation.isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
