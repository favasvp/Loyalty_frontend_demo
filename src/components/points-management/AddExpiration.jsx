import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { useExpirationRules } from "../../hooks/useExpirationRules";
import { useTiers } from "../../hooks/useTiers";
import useUiStore from "../../store/ui";

const AddExpiration = ({ isOpen, onClose, editData }) => {
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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateMutation.mutate(formData, {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExtensionChange = (index, value) => {
    setFormData((prev) => {
      const updatedMultipliers = [...prev.tier_extensions];
      updatedMultipliers[index].additional_months = value;
      return { ...prev, tier_extensions: updatedMultipliers };
    });
  };

  const handleRemainderChange = (e, remainder) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      expiry_notifications: {
        ...prev.expiry_notifications,
        [remainder]: value,
      },
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Points Expiration Rules
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Expiry Period (months)
              </label>
              <input
                type="number"
                name="default_expiry_period"
                value={formData.default_expiry_period}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Tier-based Extensions (months)
            </h4>
            <div className="space-y-3">
              {formData.tier_extensions?.map((tierExtension, index) => {
                const tierName = Tiers?.data?.find(
                  (tier) => tier._id === tierExtension.tier_id
                )?.name;

                return (
                  <div
                    key={tierExtension?.tier_id}
                    className="flex items-center gap-4"
                  >
                    <span className="w-20 text-sm font-medium text-gray-700">
                      {tierName}
                    </span>
                    <input
                      type="number"
                      value={tierExtension?.additional_months}
                      onChange={(e) =>
                        handleExtensionChange(index, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Expiry Notifications (days before)
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {["first_reminder", "second_reminder", "final_reminder"].map(
                (reminderKey) => (
                  <div key={reminderKey}>
                    <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                      {reminderKey.replace("_", " ")}
                    </label>
                    <input
                      type="number"
                      value={formData?.expiry_notifications[reminderKey]}
                      onChange={(e) => handleRemainderChange(e, reminderKey)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Expiration Policies
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grace Period (days)
              </label>
              <input
                type="number"
                name="grace_period"
                value={formData.grace_period}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
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
              name="Save Rules"
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

export default AddExpiration;
