import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";

const AddCategory = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    icon: null,
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      onSuccess();
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to add category" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        icon: file,
      }));
      setImagePreview(URL.createObjectURL(file));
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
          <h2 className="text-xl font-semibold text-gray-900">Add Category</h2>
          <button
            onClick={onClose}
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
              Icon
            </label>
            <div className="relative w-full">
              <input
                type="file"
                name="icon"
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
                  {formData.icon ? formData.icon.name : "Choose Image"}
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

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <StyledButton
              name="Cancel"
              onClick={onClose}
              variant="tertiary"
              disabled={isLoading}
            />
            <StyledButton
              name="Add Category"
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

export default AddCategory;
