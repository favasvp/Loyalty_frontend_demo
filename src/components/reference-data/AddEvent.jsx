import {
  ArrowUpTrayIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StyledButton from "../../ui/StyledButton";
import { useTriggerEvents } from "../../hooks/useTriggerEvents";
import useUiStore from "../../store/ui";

const eventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).optional(),
});

const AddEvent = ({ isOpen, onClose, onSuccess, editData }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [tagInput, setTagInput] = useState("");

  const { useCreateTriggerEvent, useUpdateTriggerEvent } = useTriggerEvents();
  const createMutation = useCreateTriggerEvent();
  const updateMutation = useUpdateTriggerEvent();
  const { addToast } = useUiStore();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: [],
    },
  });

  const watchedTags = watch("tags");

  useEffect(() => {
    if (editData) {
      const { name,description, tags } = editData?.data || {};
      reset({
        name: name || "",
        description: description || "",
        tags: tags || [],
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    if (editData) {
      updateMutation.mutate(
        { id: editData?.data?._id, triggerEventData: data },
        {
          onSuccess: (response) => {
            addToast({ type: "success", message: response?.message });
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
      createMutation.mutate(data, {
        onSuccess: (response) => {
          addToast({ type: "success", message: response?.message });
          onSuccess?.();
          resetAndClose();
        },
        onError: (error) => {
          addToast({ type: "error", message: error?.response?.data?.message });
        },
      });
    }
  };

  const resetAndClose = () => {
    setImagePreview(null);
    setTagInput("");
    reset({
      name: "",
      description: "",
      tags: [],
    });
    onClose();
  };



  const handleAddTag = () => {
    if (tagInput.trim()) {
      const currentTags = getValues("tags") || [];
      setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    const currentTags = getValues("tags") || [];
    const updatedTags = currentTags?.filter(
      (_, index) => index !== indexToRemove
    );
    setValue("tags", updatedTags);
  };

  if (!isOpen) return null;
  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1";
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-2xl p-4 max-h-[80vh] min-h-[300px] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {editData ? "Edit Event" : "Add Event"}
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
              {...register("name")}
              type="text"
              placeholder="Enter Name"
              className={inputClass}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
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
            <label className={labelClass}>Tags</label>
            <div className="relative mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className={inputClass}
                placeholder="Type and press Enter"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {watchedTags?.map((tag, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-green-200 shadow-sm hover:bg-green-200 transition-colors"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-1 p-0.5 rounded-full hover:bg-red-100 text-red-500 focus:outline-none"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {(!watchedTags || watchedTags.length === 0) && (
                <div className="text-gray-400 text-sm">No tags added yet</div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <StyledButton
              name="Cancel"
              onClick={resetAndClose}
              variant="tertiary"
            />
            <StyledButton
              name={editData ? "Edit" : "Add Event"}
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
