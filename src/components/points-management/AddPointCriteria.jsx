import React, { useState } from "react";
import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTriggerServices } from "../../hooks/useTriggerServices";
import { useAppTypes } from "../../hooks/useAppTypes";
import { usePointsCriteria } from "../../hooks/usePointsCriteria";
import { useTriggerEvents } from "../../hooks/useTriggerEvents";

const AddPointCriteria = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;
  

  const { useCreatePointsCriteria } = usePointsCriteria();
  const createMutation = useCreatePointsCriteria();
  const { useGetTriggerServices } = useTriggerServices();
  const { data: triggerServices } = useGetTriggerServices();
  const { useGetAppTypes } = useAppTypes();
  const { data: appTypes } = useGetAppTypes();
  const { useGetTriggerEvents } = useTriggerEvents();
  const { data: triggerEvents } = useGetTriggerEvents();
  

  const [formData, setFormData] = useState({
    eventType: "",
    serviceType: "",
    appType: "",
    pointSystem: [{ paymentMethod: "", pointType: "", pointRate: "" }],
    conditions: {
      maxTransactions: { weekly: "", monthly: "" },
      transactionValueLimits: { minValue: "", maxValue: "" }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: (data) => {
        addToast({ type: "success", message: data?.message });
        onClose?.();
      },
      onError: (error) => {
        addToast({ type: "error", message: error?.response?.data?.message });
      }
    });
    
    setFormData({
      eventType: "",
      serviceType: "",
      appType: "",
      pointSystem: [{ paymentMethod: "", pointType: "", pointRate: "" }],
      conditions: {
        maxTransactions: { weekly: "", monthly: "" },
        transactionValueLimits: { minValue: "", maxValue: "" }
      }
    });
    
    onClose();
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (["paymentMethod", "pointType", "pointRate"].includes(name)) {
      const updatedPointSystem = [...formData.pointSystem];
      updatedPointSystem[index] = { ...updatedPointSystem[index], [name]: value };
      setFormData(prev => ({ ...prev, pointSystem: updatedPointSystem }));
    } 
    else if (name in formData.conditions.maxTransactions) {
      setFormData(prev => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          maxTransactions: { ...prev.conditions.maxTransactions, [name]: value }
        }
      }));
    } 
    else if (name in formData.conditions.transactionValueLimits) {
      setFormData(prev => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          transactionValueLimits: { ...prev.conditions.transactionValueLimits, [name]: value }
        }
      }));
    } 
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addPointSystem = () => {
    setFormData(prev => ({
      ...prev,
      pointSystem: [...prev.pointSystem, { paymentMethod: "", pointType: "", pointRate: "" }]
    }));
  };

  const removePointSystem = (index) => {
    if (formData.pointSystem.length <= 1) return;
    const updatedPointSystem = formData.pointSystem.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, pointSystem: updatedPointSystem }));
  };


  const inputClass = "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1";
  const sectionHeadingClass = "text-sm font-medium text-gray-700 mb-3";
  const cardClass = "bg-white p-4 rounded-lg shadow-sm border border-gray-100";
  
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-2xl p-4 max-h-[80vh] min-h-[300px] overflow-y-auto">
       
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-800">Add Point Criteria</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
         
          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Basic Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Trigger Event</label>
                <select
                  name="eventType"
                  value={formData.eventType || ""}
                  onChange={(e) => handleChange(e)}
                  className={inputClass}
                >
                  <option value="" disabled>Select Event</option>
                  {triggerEvents?.data?.map((item) => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Trigger Service</label>
                <select
                  name="serviceType"
                  value={formData.serviceType || ""}
                  onChange={(e) => handleChange(e)}
                  className={inputClass}
                >
                  <option value="" disabled>Select Service</option>
                  {triggerServices?.data?.map((item) => (
                    <option key={item._id} value={item._id}>{item.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>App Type</label>
                <select
                  name="appType"
                  value={formData.appType || ""}
                  onChange={(e) => handleChange(e)}
                  className={inputClass}
                >
                  <option value="" disabled>Select App</option>
                  {appTypes?.data?.map((item) => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex justify-between items-center mb-3">
              <h3 className={sectionHeadingClass}>Reward Configuration</h3>
              <button
                type="button"
                onClick={addPointSystem}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                Add Point System
              </button>
            </div>

            <div className="space-y-3">
              {formData.pointSystem.map((pointItem, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-medium mr-2">
                        {index + 1}
                      </span>
                      <h4 className="text-xs font-medium text-gray-700">
                        Reward Method
                      </h4>
                    </div>
                    {formData.pointSystem.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePointSystem(index)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className={labelClass}>Payment Method</label>
                      <select
                        name="paymentMethod"
                        value={pointItem.paymentMethod || ""}
                        onChange={(e) => handleChange(e, index)}
                        className={inputClass}
                      >
                        <option value="" disabled>Select Method</option>
                        <option value="Khedmah-site">Khedmah-site</option>
                        <option value="KhedmahPay-Wallet">KhedmahPay-Wallet</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Point Type</label>
                      <select
                        name="pointType"
                        value={pointItem.pointType || ""}
                        onChange={(e) => handleChange(e, index)}
                        className={inputClass}
                      >
                        <option value="" disabled>Select Type</option>
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Point Rate</label>
                      <input
                        type="text"
                        name="pointRate"
                        value={pointItem.pointRate || ""}
                        placeholder="Enter rate"
                        onChange={(e) => handleChange(e, index)}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Limitations & Thresholds</h3>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Maximum Transactions</h4>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Weekly Limit</label>
                    <input
                      type="text"
                      name="weekly"
                      value={formData.conditions.maxTransactions.weekly}
                      placeholder="Weekly max"
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Limit</label>
                    <input
                      type="text"
                      name="monthly"
                      value={formData.conditions.maxTransactions.monthly}
                      placeholder="Monthly max"
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Transaction Value Limits</h4>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Minimum Value</label>
                    <input
                      type="text"
                      name="minValue"
                      value={formData.conditions.transactionValueLimits.minValue}
                      placeholder="Minimum value"
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Maximum Value</label>
                    <input
                      type="text"
                      name="maxValue"
                      value={formData.conditions.transactionValueLimits.maxValue}
                      placeholder="Maximum value"
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Criteria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPointCriteria;