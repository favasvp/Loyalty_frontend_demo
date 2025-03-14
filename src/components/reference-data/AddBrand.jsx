import React, { useEffect, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { useBrands } from "../../hooks/useBrand";
import useUiStore from "../../store/ui";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const schema = z.object({
  title: z.string().min(1, "Name is required"),
  image: z.string().url("Invalid image URL"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

const AddBrand = ({ isOpen, onClose, editData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      image: "",
      description: "",
    },
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { useCreateBrand, useUpdateBrand } = useBrands();
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();
  const { addToast } = useUiStore();
  useEffect(() => {
    if (editData) {
      reset({
        title: editData?.data?.title,
        image: editData?.data?.image,
        description: editData?.data?.description,
      });
      setImagePreview(editData?.data?.image);
    }
  }, [editData, reset]);
  const onSubmit = async (data) => {
    if (editData) {
      updateMutation.mutate(
        {
          id: editData?.data?._id,
          formData: data,
        },
        {
          onSuccess: (data) => {
            addToast({
              type: "success",
              message: data?.message,
            });
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
      createMutation.mutate(data, {
        onSuccess: (data) => {
          addToast({
            type: "success",
            message: data?.message,
          });
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
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl =
        "https://cdn.scoreapp.com/site/uploads/2024/09/Common-issues-of-organising-events_-1024x512.png";
      setImagePreview(imageUrl);
      setValue("image", imageUrl);
    }
  };
  const resetAndClose = () => {
    setImagePreview(null);
    reset({
      title: "",
      image: "",
      description: "",
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
            {editData ? "Edit" : "Add Brand"}
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
            <input {...register("title")} className={inputClass} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
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
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
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
            <label className={labelClass}>Description</label>
            <textarea {...register("description")} className={inputClass} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
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
              name={editData ? "Update" : "Add Brand"}
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
