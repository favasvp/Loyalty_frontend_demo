import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRedemptionRules } from "../../hooks/useRedemptionRules";
import useUiStore from "../../store/ui";
import { useTiers } from "../../hooks/useTiers";
import { useAppTypes } from "../../hooks/useAppTypes";

const AddRedemption = ({ isOpen, onClose, editData, id }) => {
  if (!isOpen) return null;

  const { useGetTiers } = useTiers();
  const { data: Tiers } = useGetTiers();
  const { useGetAppTypes } = useAppTypes();
  const { data: appTypes } = useGetAppTypes();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minimum_points_required: "",
      maximum_points_per_day: "",
      tier_multipliers: [],
    },
  });

  useEffect(() => {
    if (id) {
      setValue("appType", id);
    }
  }, [id, setValue]);
  const { useUpdateRedemptionRules,useCreateRedemptionRules } = useRedemptionRules();
  const updateMutation = useUpdateRedemptionRules();
  const createMutation = useCreateRedemptionRules();
  const { addToast } = useUiStore();

  useEffect(() => {
    if (Tiers?.data) {
      const allTiers = Tiers.data.map((tier) => ({
        tier_id: tier._id,
        multiplier: 0,
      }));

      if (editData) {
        const updatedMultipliers = allTiers.map((tier) => {
          const existingMultiplier = editData?.tier_multipliers?.find(
            (item) => item?.tier_id === tier.tier_id
          );
          return {
            tier_id: tier.tier_id,
            multiplier: existingMultiplier ? existingMultiplier.multiplier : 0,
          };
        });

        reset({
          minimum_points_required: editData?.minimum_points_required || "",
          maximum_points_per_day: editData?.maximum_points_per_day || "",
          tier_multipliers: updatedMultipliers,
        });
      } else {
        setValue("tier_multipliers", allTiers);
      }
    }
  }, [editData, Tiers, reset, setValue]);

  const onSubmit = (formData) => {
    if (editData) {
      updateMutation.mutate( {
        id: editData?._id,
        rulesData:formData,
      }, {
        onSuccess: (data) => {
          addToast({
            type: "success",
            message: data?.message || "Redemption rules updated successfully",
          });
          onClose?.();
        },
        onError: (error) => {
          addToast({
            type: "error",
            message:
              error?.response?.data?.message ||
              "Failed to update redemption rules",
          });
        },
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: (res) => {
          addToast({ type: "success", message: res?.message });
          reset();
          onClose();
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
            Redemption Rules Configuration
          </h2>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-6">
          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Basic Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Minimum Points Required</label>
                <input
                  type="number"
                  {...register("minimum_points_required", {
                    required: "Minimum points is required",
                    min: { value: 0, message: "Must be a positive number" },
                  })}
                  className={inputClass}
                  placeholder="Enter minimum points"
                />
                {errors.minimum_points_required && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.minimum_points_required.message}
                  </p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  Minimum points needed for redemption
                </div>
              </div>
              <div>
                <label className={labelClass}>Maximum Points Per Day</label>
                <input
                  type="number"
                  {...register("maximum_points_per_day", {
                    required: "Maximum points is required",
                    min: { value: 0, message: "Must be a positive number" },
                  })}
                  className={inputClass}
                  placeholder="Enter maximum points"
                />
                {errors.maximum_points_per_day && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.maximum_points_per_day.message}
                  </p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  Maximum points redeemable per day
                </div>
              </div>
              <div>
                <label className={labelClass}>App Type</label>
                <select
                  {...register("appType", { required: "App Type is required" })}
                  className={inputClass} disabled
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
                    {errors.appTypes.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Tier Multipliers</h3>
            <div className="space-y-3">
              {Tiers?.data?.map((tier, index) => (
                <div
                  key={tier._id}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="w-24 text-sm text-gray-700 font-medium">
                    {tier.name}
                  </div>
                  <div className="flex-1">
                    <Controller
                      name={`tier_multipliers.${index}.multiplier`}
                      control={control}
                      defaultValue={1}
                      rules={{
                        required: "Multiplier is required",
                        min: {
                          value: 0,
                          message: "Must be a non-negative number",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                          }}
                          className={inputClass}
                          placeholder="Multiplier value"
                        />
                      )}
                    />
                    <input
                      type="hidden"
                      {...register(`tier_multipliers.${index}.tier_id`)}
                      value={tier._id}
                    />
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 mt-1">
                Multipliers for maximum points per day based on member tier
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t mt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Rules
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRedemption;
