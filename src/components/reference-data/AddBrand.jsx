import React, { useEffect, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { useBrands } from "../../hooks/useBrand";
import useUiStore from "../../store/ui";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";

const AddBrand = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { useCreateBrand, useUpdateBrand } = useBrands();
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();
  const { addToast } = useUiStore();
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData?.data?.title,
        image: editData?.data?.image,
        description: editData?.data?.description,
      });
      setImagePreview(editData?.data?.image);
    }
  }, [editData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData) {
      updateMutation.mutate(
        {
          id: editData?.data?._id,
          formData: formData,
        },
        {
          onSuccess: (data) => {
            addToast({
              type: "success",
              message: data?.message,
            });
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
        title: "",
        image: "",
        description: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image:
          "https://cdn.scoreapp.com/site/uploads/2024/09/Common-issues-of-organising-events_-1024x512.png",
      }));
      setImagePreview(
        "https://cdn.scoreapp.com/site/uploads/2024/09/Common-issues-of-organising-events_-1024x512.png"
      );
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Brand</h2>
          <button
            onClick={() => {
              setFormData({
                title:"",
                description:"",
                image:""
              });
              setImagePreview(null)
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
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <div className="relative w-full">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                id="file-upload"
                onChange={handleChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer w-full border border-gray-300 rounded-lg px-3 py-3 flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">
                  {formData.image ? formData.image.name : "Choose Image"}
                </span>
                <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
              </label>
            </div>
          </div>

          {imagePreview && (
            <div className="mt-3">
              <p className="text-sm text-gray-700">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

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

          <div className="flex justify-end gap-3 mt-6">
            <StyledButton
              name="Cancel"
              onClick={() => {
                setFormData({
                  title:"",
                  description:"",
                  image:""
                });
                setImagePreview(null)
                onClose();
              }}
              variant="tertiary"
              disabled={isLoading}
            />
            <StyledButton
              name="Add Brand"
              type="submit"
              variant="primary"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
