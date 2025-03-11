import {
  ArrowUpTrayIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import useUiStore from "../../store/ui";
import { useTriggerServices } from "../../hooks/useTriggerServices";
import { useTriggerEvents } from "../../hooks/useTriggerEvents";

const AddService = ({ isOpen, onClose, onSuccess, editData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    triggerEvent: "",
  });
  const { useCreateTriggerService, useUpdateTriggerService } =
    useTriggerServices();
  const createMutation = useCreateTriggerService();
  const updateMutation = useUpdateTriggerService();
  const { addToast } = useUiStore();
  const { useGetTriggerEvents } = useTriggerEvents();
  const { data: triggerEvents } = useGetTriggerEvents();
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData?.data?.title,
        triggerEvent: editData?.data?.triggerEvent,
        description: editData?.data?.description,
      });
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
        title: "",
        description: "",
        triggerEvent: "",
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
          <h2 className="text-xl font-semibold text-gray-900">Add Service</h2>
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
              placeholder="Enter Name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

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
              Trigger Event
            </label>
            <select
              name="triggerEvent"
              value={formData.triggerEvent || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select Trigger Event
              </option>
              {triggerEvents?.data?.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <StyledButton name="Cancel" onClick={onClose} variant="tertiary" />
            <StyledButton
              name="Add Service"
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
