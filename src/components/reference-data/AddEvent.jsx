import {
  ArrowUpTrayIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { useTriggerEvents } from "../../hooks/useTriggerEvents";
import useUiStore from "../../store/ui";

const AddEvent = ({ isOpen, onClose, onSuccess, editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    description: "",
    tags: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const { useCreateTriggerEvent, useUpdateTriggerEvent } = useTriggerEvents();
  const createMutation = useCreateTriggerEvent();
  const updateMutation = useUpdateTriggerEvent();
  const { addToast } = useUiStore();
  useEffect(() => {
    if (editData) {
      setFormData(
        {
          name: editData?.data?.name,
          icon: editData?.data?.icon,
          description: editData?.data?.description,
          tags: editData?.data?.tags,
        },
        {
          icon: editData?.data?.icon,
        }
      );
      setImagePreview(editData?.data?.icon);
    }
  }, [editData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData) {
      updateMutation.mutate(
        {
          id: editData?.data?._id,
          triggerEventData: formData,
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
    const { name, value, files } = e.target;

    if (name === "icon" && files?.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        icon: "https://cdn.scoreapp.com/site/uploads/2024/09/Common-issues-of-organising-events_-1024x512.png",
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

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-2xl p-4 max-h-[80vh] min-h-[300px] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{editData ? "Edit" : "Add Event"}</h2>
          <button
            onClick={() => {
              setFormData({
                tags:[],
                description:"",
                icon:"",
                name:""
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
              name="name"
              value={formData.name}
              placeholder="Enter Name"
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
              placeholder="Enter description"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type and press Enter or Add"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                disabled={!tagInput.trim()}
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            {formData?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50 min-h-10">
                {formData?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1 transition-all hover:bg-green-200"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="text-green-700 hover:text-red-600 rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <StyledButton
              name="Cancel"
              onClick={() => {
                setFormData({
                  tags:[],
                  description:"",
                  icon:"",
                  name:""
                });
                setImagePreview(null)
                onClose();
              }}
              variant="tertiary"
              // disabled={isLoading}
            />
            <StyledButton
              name={editData ? "Edit" : "Add Event"}
              type="submit"
              variant="primary"
              // disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
