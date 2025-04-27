import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useExpirationRules } from "../../hooks/useExpirationRules";
import { useTiers } from "../../hooks/useTiers";
import useUiStore from "../../store/ui";
import { useAppTypes } from "../../hooks/useAppTypes";

const AddExpiration = ({ isOpen, onClose, editData, id }) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      default_expiry_period: 0,
      grace_period: 0,
      tier_extensions: [],
      appType: id || "",
      expiry_notifications: {
        first_reminder: 0,
        second_reminder: 0,
        final_reminder: 0,
      },
    },
  });

  const { useGetTiers } = useTiers();
  const { data: Tiers } = useGetTiers();
  const { useUpdateExpirationRules, useCreateExpiration } =
    useExpirationRules();
  const updateMutation = useUpdateExpirationRules();
  const createMutation = useCreateExpiration();
  const { addToast } = useUiStore();
  const { useGetAppTypes } = useAppTypes();
  const { data: appTypes } = useGetAppTypes();

  useEffect(() => {
    if (id) {
      setValue("appType", id);
    }
  }, [id, setValue]);

  useEffect(() => {
    if (editData) {
      const tierExtensionsMap = editData.tier_extensions?.reduce((acc, ext) => {
        acc[ext.tier_id] = ext.additional_months;
        return acc;
      }, {});

      reset({
        default_expiry_period: editData?.default_expiry_period || 0,
        grace_period: editData?.grace_period || 0,
        tier_extensions: editData?.tier_extensions || [],
        appType: editData?.appTypes || id || "",
        expiry_notifications: {
          first_reminder: editData?.expiry_notifications?.first_reminder || 0,
          second_reminder: editData?.expiry_notifications?.second_reminder || 0,
          final_reminder: editData?.expiry_notifications?.final_reminder || 0,
        },
      });
      if (Tiers?.data) {
        Tiers.data.forEach((tier) => {
          setValue(
            `tier_extensions.${tier._id}`,
            tierExtensionsMap?.[tier._id] || 0
          );
        });
      }
    }
  }, [editData, reset, Tiers, id, setValue]);

  const onSubmit = (formData) => {
    const preparedFormData = {
      ...formData,
      tier_extensions: Tiers?.data
        ?.map((tier) => ({
          tier_id: tier._id,
          additional_months: formData.tier_extensions[tier._id] || 0,
        }))
        .filter((ext) => ext.additional_months > 0),
    };

    if (editData) {
      updateMutation.mutate(
        {
          id: editData?._id,
          rulesData: preparedFormData,
        },
        {
          onSuccess: (data) => {
            addToast({
              type: "success",
              message: data?.message || "Expiration rules updated successfully",
            });
            onClose?.();
          },
          onError: (error) => {
            addToast({
              type: "error",
              message:
                error?.response?.data?.message ||
                "Failed to update expiration rules",
            });
          },
        }
      );
    } else {
      createMutation.mutate(preparedFormData, {
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

  const formatReminderLabel = (key) => {
    const labels = {
      first_reminder: "First Reminder",
      second_reminder: "Second Reminder",
      final_reminder: "Final Reminder",
    };
    return labels[key] || key.replace(/_/g, " ");
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
            Points Expiration Rules
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
                <label className={labelClass}>
                  Default Expiry Period (months)
                </label>
                <input
                  type="number"
                  {...register("default_expiry_period", {
                    required: "Default expiry period is required",
                    min: { value: 0, message: "Must be a positive number" },
                  })}
                  className={inputClass}
                  placeholder="e.g. 12"
                />
                {errors.default_expiry_period && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.default_expiry_period.message}
                  </p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  Standard expiration time
                </div>
              </div>
              <div>
                <label className={labelClass}>Grace Period (days)</label>
                <input
                  type="number"
                  {...register("grace_period", {
                    required: "Grace period is required",
                    min: { value: 0, message: "Must be a positive number" },
                  })}
                  className={inputClass}
                  placeholder="e.g. 30"
                />
                {errors.grace_period && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.grace_period.message}
                  </p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  Additional time after expiration
                </div>
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
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Tier-based Extensions</h3>
            <div className="space-y-3">
              {Tiers?.data?.map((tier) => (
                <div
                  key={tier._id}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="w-24 text-sm text-gray-700 font-medium">
                    {tier.name?.en}
                  </div>
                  <div className="flex-1">
                    <Controller
                      name={`tier_extensions.${tier._id}`}
                      control={control}
                      defaultValue={0}
                      render={({ field }) => (
                        <input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            field.onChange(value);
                          }}
                          min={0}
                          className={inputClass}
                          placeholder="Additional months"
                        />
                      )}
                    />
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 mt-1">
                Additional months based on member tier
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Expiry Notifications</h3>
            <div className="grid grid-cols-3 gap-4">
              {["first_reminder", "second_reminder", "final_reminder"].map(
                (reminderKey) => (
                  <div key={reminderKey}>
                    <label className={labelClass}>
                      {formatReminderLabel(reminderKey)} (days)
                    </label>
                    <Controller
                      name={`expiry_notifications.${reminderKey}`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10) || 0;
                            field.onChange(value);
                          }}
                          min={0}
                          className={inputClass}
                          placeholder="Days before"
                        />
                      )}
                    />
                  </div>
                )
              )}
            </div>
            <div className="text-xs text-gray-500 mt-3">
              Days before expiration when notifications should be sent
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
              {"Save Rules"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpiration;
