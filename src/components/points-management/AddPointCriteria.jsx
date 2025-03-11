import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { useTriggerServices } from "../../hooks/useTriggerServices";
import { useAppTypes } from "../../hooks/useAppTypes";
import { usePointsCriteria } from "../../hooks/usePointsCriteria";
import { useTriggerEvents } from "../../hooks/useTriggerEvents";

const AddPointCriteria = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;
  const { useCreatePointsCriteria } = usePointsCriteria();
  const createMutation = useCreatePointsCriteria();
  const [formData, setFormData] = useState({
    eventType: "",
    serviceType: "",
    appType: "",
    pointSystem: [
      {
        paymentMethod: "",
        pointType: "",
        pointRate: "",
      },
    ],
    conditions: {
      maxTransactions: {
        weekly: "",
        monthly: "",
      },
      transactionValueLimits: {
        minValue: "",
        maxValue: "",
      },
    },
  });

  const { useGetTriggerServices } = useTriggerServices();
  const { data: triggerServices } = useGetTriggerServices();
  const { useGetAppTypes } = useAppTypes();
  const { data: appTypes } = useGetAppTypes();
  const { useGetTriggerEvents } = useTriggerEvents();
  const { data: triggerEvents } = useGetTriggerEvents();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      eventType: "",
      serviceType: "",
      appType: "",
      pointSystem: [
        {
          paymentMethod: "",
          pointType: "",
          pointRate: "",
        },
      ],
      conditions: {
        maxTransactions: {
          weekly: "",
          monthly: "",
        },
        transactionValueLimits: {
          minValue: "",
          maxValue: "",
        },
      },
    });

    onClose();
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (
      name === "paymentMethod" ||
      name === "pointType" ||
      name === "pointRate"
    ) {
      const updatedPointSystem = [...formData.pointSystem];
      updatedPointSystem[index] = {
        ...updatedPointSystem[index],
        [name]: value,
      };

      setFormData((prev) => ({
        ...prev,
        pointSystem: updatedPointSystem,
      }));
    } else if (name in formData.conditions.maxTransactions) {
      setFormData((prev) => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          maxTransactions: {
            ...prev.conditions.maxTransactions,
            [name]: value,
          },
        },
      }));
    } else if (name in formData.conditions.transactionValueLimits) {
      setFormData((prev) => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          transactionValueLimits: {
            ...prev.conditions.transactionValueLimits,
            [name]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addPointSystem = () => {
    setFormData((prev) => ({
      ...prev,
      pointSystem: [
        ...prev.pointSystem,
        {
          paymentMethod: "",
          pointType: "",
          pointRate: "",
        },
      ],
    }));
  };

  const removePointSystem = (index) => {
    if (formData.pointSystem.length <= 1) return;

    const updatedPointSystem = formData.pointSystem.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      pointSystem: updatedPointSystem,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[80vh] min-h-[300px] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Add PointCriteria
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Trigger Event
              </label>
              <select
                name="eventType"
                value={formData.eventType || ""}
                onChange={(e) => handleChange(e)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select Trigger Event
                </option>
                {triggerEvents?.data?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Trigger service
              </label>
              <select
                name="serviceType"
                value={formData.serviceType || ""}
                onChange={(e) => handleChange(e)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select Trigger Service
                </option>
                {triggerServices?.data?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                App Type
              </label>
              <select
                name="appType"
                value={formData.appType || ""}
                onChange={(e) => handleChange(e)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select AppType
                </option>
                {appTypes?.data?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-md font-medium text-gray-800">
                Point System
              </h3>
              <button
                type="button"
                onClick={addPointSystem}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100"
              >
                <PlusIcon className="w-4 h-4" />
                Add Point System
              </button>
            </div>

            {formData.pointSystem.map((pointItem, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-200 rounded-lg "
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-medium text-gray-700">
                    Point System #{index + 1}
                  </h4>
                  {formData.pointSystem.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePointSystem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={pointItem.paymentMethod || ""}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="" disabled>
                        Select Payment Method
                      </option>
                      <option value="Khedmah-site">Khedmah-site</option>
                      <option value="KhedmahPay-Wallet">
                        KhedmahPay-Wallet
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Point Type
                    </label>
                    <select
                      name="pointType"
                      value={pointItem.pointType || ""}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="" disabled>
                        Select Point Type
                      </option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Point Rate
                    </label>
                    <input
                      type="text"
                      name="pointRate"
                      value={pointItem.pointRate || ""}
                      placeholder="Enter Point Rate"
                      onChange={(e) => handleChange(e, index)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-800">Conditions</h3>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="text-xs font-medium text-gray-700 mb-2">
                Maximum Transactions
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Weekly
                  </label>
                  <input
                    type="text"
                    name="weekly"
                    value={formData.conditions.maxTransactions.weekly}
                    placeholder="Enter Weekly Limit"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Monthly
                  </label>
                  <input
                    type="text"
                    name="monthly"
                    value={formData.conditions.maxTransactions.monthly}
                    placeholder="Enter Monthly Limit"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <h4 className="text-xs font-medium text-gray-700 mt-4 mb-2">
                Transaction Value Limits
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Min Value
                  </label>
                  <input
                    type="text"
                    name="minValue"
                    value={formData.conditions.transactionValueLimits.minValue}
                    placeholder="Enter Min Value"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Max Value
                  </label>
                  <input
                    type="text"
                    name="maxValue"
                    value={formData.conditions.transactionValueLimits.maxValue}
                    placeholder="Enter Max Value"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <StyledButton name="Cancel" onClick={onClose} variant="tertiary" />
            <StyledButton
              name="Add PointCriteria"
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPointCriteria;
