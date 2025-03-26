import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTriggerServices } from "../../hooks/useTriggerServices";
import { useAppTypes } from "../../hooks/useAppTypes";
import { usePointsCriteria } from "../../hooks/usePointsCriteria";
import { useTriggerEvents } from "../../hooks/useTriggerEvents";
import useUiStore from "../../store/ui";

const AddPointCriteria = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;

  const { useCreatePointsCriteria,useUpdatePointsCriteria } = usePointsCriteria();
  const createMutation = useCreatePointsCriteria();
  const updateMutation = useUpdatePointsCriteria();
  const { addToast } = useUiStore();

  const { useGetTriggerEvents } = useTriggerEvents();
  const { data: triggerEvents } = useGetTriggerEvents();

  const { useGetTriggerServiceByTriggerEventId } = useTriggerServices();
  const { useGetAppTypes } = useAppTypes();
  const { data: appTypes } = useGetAppTypes();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventType: "",
      serviceType: "",
      appType: "",
      pointSystem: [{ paymentMethod: "", pointType: "", pointRate: "" }],
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
    },
  });

  const watchPointSystem = watch("pointSystem");
  const watchEventType = watch("eventType");

  const { data: triggerServices } =
    useGetTriggerServiceByTriggerEventId(watchEventType);
  useEffect(() => {
    if (editData) {
      const serviceTypeId =
        editData.serviceType?._id || editData.serviceType || "";

      console.log("ServiceType ID to set:", serviceTypeId);
      setValue("eventType", editData.eventType?._id || "");
      if (serviceTypeId) {
        setValue("serviceType", serviceTypeId);
      }

      setValue("appType", editData.appType?._id || "");
      setValue("description", editData.description || "");
      if (editData.pointSystem && editData.pointSystem.length > 0) {
        setValue(
          "pointSystem",
          editData.pointSystem.map((item) => ({
            paymentMethod: item.paymentMethod,
            pointType: item.pointType,
            pointRate: item.pointRate,
          }))
        );
      }
      if (editData.conditions) {
        setValue(
          "conditions.maxTransactions.weekly",
          editData.conditions.maxTransactions?.weekly || ""
        );
        setValue(
          "conditions.maxTransactions.monthly",
          editData.conditions.maxTransactions?.monthly || ""
        );
        setValue(
          "conditions.transactionValueLimits.minValue",
          editData.conditions.transactionValueLimits?.minValue || ""
        );
        setValue(
          "conditions.transactionValueLimits.maxValue",
          editData.conditions.transactionValueLimits?.maxValue || ""
        );
      }
    }
  }, [editData, setValue, triggerServices]);
  const paymentMethodOptions = [
    { value: "Khedmah-site", label: "Khedmah-site" },
    { value: "KhedmahPay-Wallet", label: "KhedmahPay-Wallet" },
  ];

  const pointTypeOptions = [
    { value: "percentage", label: "Percentage" },
    { value: "fixed", label: "Fixed" },
  ];

  const onSubmit = (data) => {
    const formData = {
      ...data,
      pointSystem: data.pointSystem.map((item) => ({
        paymentMethod: item.paymentMethod,
        pointType: item.pointType,
        pointRate: item.pointRate,
      })),
    };
    if (editData) {
      updateMutation.mutate(
        { id: editData?._id, criteriaData: formData },
        {
          onSuccess: (data) => {
            addToast({ type: "success", message: data?.message });
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
      onSuccess: (responseData) => {
        addToast({
          type: "success",
          message: responseData?.message,
        });
        onClose?.();
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: error?.response?.data?.message,
        });
      },
    });}
  };

  const addPointSystem = () => {
    const currentPointSystem = watchPointSystem || [];
    setValue("pointSystem", [
      ...currentPointSystem,
      { paymentMethod: "", pointType: "", pointRate: "" },
    ]);
  };

  const removePointSystem = (index) => {
    const currentPointSystem = watchPointSystem || [];
    if (currentPointSystem.length <= 1) return;

    const updatedPointSystem = currentPointSystem.filter((_, i) => i !== index);
    setValue("pointSystem", updatedPointSystem);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1";
  const sectionHeadingClass = "text-sm font-medium text-gray-700 mb-3";
  const cardClass = "bg-white p-4 rounded-lg shadow-sm border border-gray-100";

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-2xl p-4 max-h-[80vh] min-h-[300px] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-800">
            Add Point Criteria
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-6">
          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Basic Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Trigger Event</label>
                <select
                  {...register("eventType", {
                    required: "Trigger Event is required",
                  })}
                  className={inputClass}
                >
                  <option value="">Select Event</option>
                  {triggerEvents?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.eventType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventType.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>Trigger Service</label>
                <select
                  {...register("serviceType", {
                    required: "Trigger Service is required",
                  })}
                  className={inputClass}
                >
                  <option value="">Select Service</option>
                  {triggerServices?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.serviceType.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>App Type</label>
                <select
                  {...register("appType", { required: "App Type is required" })}
                  className={inputClass}
                >
                  <option value="">Select App</option>
                  {appTypes?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.appType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.appType.message}
                  </p>
                )}
              </div>
            </div>{" "}
            <div className="mt-4">
              <label className={labelClass}>Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className={`${inputClass} h-24 resize-none`}
                placeholder="Enter description..."
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
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
              {watchPointSystem.map((pointItem, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-medium mr-2">
                        {index + 1}
                      </span>
                      <h4 className="text-xs font-medium text-gray-700">
                        Reward Method
                      </h4>
                    </div>
                    {watchPointSystem.length > 1 && (
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
                        {...register(`pointSystem.${index}.paymentMethod`, {
                          required: "Payment method is required",
                        })}
                        className={inputClass}
                      >
                        <option value="">Select Payment Method</option>
                        {paymentMethodOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.pointSystem?.[index]?.paymentMethod && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pointSystem[index].paymentMethod.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Point Type</label>
                      <select
                        {...register(`pointSystem.${index}.pointType`, {
                          required: "Point type is required",
                        })}
                        className={inputClass}
                      >
                        <option value="">Select Point Type</option>
                        {pointTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.pointSystem?.[index]?.pointType && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pointSystem[index].pointType.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Point Rate</label>
                      <input
                        type="text"
                        {...register(`pointSystem.${index}.pointRate`, {
                          required: "Point rate is required",
                          pattern: {
                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                            message: "Invalid point rate format",
                          },
                        })}
                        placeholder="Enter rate"
                        className={inputClass}
                      />
                      {errors.pointSystem?.[index]?.pointRate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pointSystem[index].pointRate.message}
                        </p>
                      )}
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
                <h4 className="text-xs font-medium text-gray-600 mb-2">
                  Maximum Transactions
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Weekly Limit</label>
                    <input
                      type="number"
                      {...register("conditions.maxTransactions.weekly", {
                        min: {
                          value: 0,
                          message: "Weekly limit must be non-negative",
                        },
                      })}
                      placeholder="Weekly max"
                      className={inputClass}
                    />
                    {errors.conditions?.maxTransactions?.weekly && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.conditions.maxTransactions.weekly.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Limit</label>
                    <input
                      type="number"
                      {...register("conditions.maxTransactions.monthly", {
                        min: {
                          value: 0,
                          message: "Monthly limit must be non-negative",
                        },
                      })}
                      placeholder="Monthly max"
                      className={inputClass}
                    />
                    {errors.conditions?.maxTransactions?.monthly && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.conditions.maxTransactions.monthly.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">
                  Transaction Value Limits
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Minimum Value</label>
                    <input
                      type="number"
                      {...register(
                        "conditions.transactionValueLimits.minValue",
                        {
                          min: {
                            value: 0,
                            message: "Minimum value must be non-negative",
                          },
                        }
                      )}
                      placeholder="Minimum value"
                      className={inputClass}
                    />
                    {errors.conditions?.transactionValueLimits?.minValue && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          errors.conditions.transactionValueLimits.minValue
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Maximum Value</label>
                    <input
                      type="number"
                      {...register(
                        "conditions.transactionValueLimits.maxValue",
                        {
                          min: {
                            value: 0,
                            message: "Maximum value must be non-negative",
                          },
                        }
                      )}
                      placeholder="Maximum value"
                      className={inputClass}
                    />
                    {errors.conditions?.transactionValueLimits?.maxValue && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          errors.conditions.transactionValueLimits.maxValue
                            .message
                        }
                      </p>
                    )}
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
