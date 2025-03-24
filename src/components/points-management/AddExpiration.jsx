import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useExpirationRules } from "../../hooks/useExpirationRules";
import { useTiers } from "../../hooks/useTiers";
import useUiStore from "../../store/ui";

const AddExpiration = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    grace_period: "",
    default_expiry_period: "",
    tier_extensions: [],
    expiry_notifications: {
      first_reminder: 0,
      second_reminder: 0,
      final_reminder: 0,
    },
  });
  
  const { useGetTiers } = useTiers();
  const { data: Tiers } = useGetTiers();
  const { useUpdateExpirationRules } = useExpirationRules();
  const updateMutation = useUpdateExpirationRules();
  const { addToast } = useUiStore();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (editData) {
      setFormData({
        default_expiry_period: editData?.default_expiry_period || "",
        grace_period: editData?.grace_period || "",
        tier_extensions:
          editData?.tier_extensions?.map((item) => ({
            tier_id: item?.tier_id?._id,
            additional_months: item?.additional_months || 1,
          })) || [],
        expiry_notifications: {
          first_reminder: editData?.expiry_notifications?.first_reminder || 0,
          second_reminder: editData?.expiry_notifications?.second_reminder || 0,
          final_reminder: editData?.expiry_notifications?.final_reminder || 0,
        },
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    updateMutation.mutate(formData, {
      onSuccess: (data) => {
        addToast({
          type: "success",
          message: data?.message || "Expiration rules updated successfully",
        });
        setIsLoading(false);
        onClose?.();
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: error?.response?.data?.message || "Failed to update expiration rules",
        });
        setIsLoading(false);
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExtensionChange = (tierId, value) => {
    setFormData((prev) => {
      const updatedExtensions = [...prev.tier_extensions];
      const existingIndex = updatedExtensions.findIndex(ext => ext.tier_id === tierId);
      
      if (existingIndex >= 0) {
        updatedExtensions[existingIndex].additional_months = value;
      } else {
        updatedExtensions.push({
          tier_id: tierId,
          additional_months: value
        });
      }
      
      return { ...prev, tier_extensions: updatedExtensions };
    });
  };

  const handleReminderChange = (reminderKey, value) => {
    setFormData((prev) => ({
      ...prev,
      expiry_notifications: {
        ...prev.expiry_notifications,
        [reminderKey]: parseInt(value, 10) || 0,
      },
    }));
  };

  const formatReminderLabel = (key) => {
    const labels = {
      first_reminder: "First Reminder",
      second_reminder: "Second Reminder",
      final_reminder: "Final Reminder"
    };
    return labels[key] || key.replace(/_/g, ' ');
  };

  const inputClass = "w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors";
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
              setFormData({});
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Basic Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Default Expiry Period (months)</label>
                <input
                  type="number"
                  name="default_expiry_period"
                  min="0"
                  value={formData.default_expiry_period}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 12"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Standard expiration time
                </div>
              </div>
              <div>
                <label className={labelClass}>Grace Period (days)</label>
                <input
                  type="number"
                  name="grace_period"
                  min="0"
                  value={formData.grace_period}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 30"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Additional time after expiration
                </div>
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Tier-based Extensions</h3>
            <div className="space-y-3">
              {Tiers?.data?.map((tier) => {
                const existingExtension = formData.tier_extensions.find(
                  (ext) => ext.tier_id === tier._id
                );

                return (
                  <div key={tier._id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="w-24 text-sm text-gray-700 font-medium">
                      {tier.name}
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        min="0"
                        value={existingExtension?.additional_months || 0}
                        onChange={(e) =>
                          handleExtensionChange(tier._id, Number(e.target.value))
                        }
                        className={inputClass}
                        placeholder="Additional months"
                      />
                    </div>
                  </div>
                );
              })}
              <div className="text-xs text-gray-500 mt-1">
                Additional months based on member tier
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Expiry Notifications</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(formData.expiry_notifications).map((reminderKey) => (
                <div key={reminderKey}>
                  <label className={labelClass}>
                    {formatReminderLabel(reminderKey)} (days)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.expiry_notifications[reminderKey]}
                    onChange={(e) => handleReminderChange(reminderKey, e.target.value)}
                    className={inputClass}
                    placeholder="Days before"
                  />
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-3">
              Days before expiration when notifications should be sent
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t mt-4">
            <button
              type="button"
              onClick={() => {
                setFormData({});
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isLoading ? "Saving..." : "Save Rules"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpiration;