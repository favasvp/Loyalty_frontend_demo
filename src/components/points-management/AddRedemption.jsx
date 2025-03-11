import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { useRedemptionRules } from "../../hooks/useRedemptionRules";
import useUiStore from "../../store/ui";

const AddRedemption = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({
    minimum_points_required: "",
    maximum_points_per_day: "",
    tier_multipliers: {
      silver: 0,
      gold: 0,
      platinum: 0,
    },
  });
  const { useUpdateRedemptionRules } = useRedemptionRules();
  const updateMutation = useUpdateRedemptionRules();
  const { addToast } = useUiStore();
  useEffect(() => {
    if (editData) {
      setFormData({
        minimum_points_required: editData?.minimum_points_required || "",
        maximum_points_per_day: editData?.maximum_points_per_day || "",
        tier_multipliers: {
          silver: editData?.tier_multipliers?.silver || "",
          gold: editData?.tier_multipliers?.gold || "",
          platinum: editData?.tier_multipliers?.platinum || "",
        },
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateMutation.mutate(formData,
      {
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
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTierChange = (e, tier) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      tier_multipliers: {
        ...prev.tier_multipliers,
        [tier]: value,
      },
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Redemption Rules Configuration
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Points Required
              </label>
              <input
                type="number"
                name="minimum_points_required"
                value={formData.minimum_points_required}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Points Per Day
              </label>
              <input
                type="number"
                name="maximum_points_per_day"
                value={formData.maximum_points_per_day}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Tier Multipliers - for maximum points per day
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {["silver", "gold", "platinum"].map((tier) => (
                <div key={tier}>
                  <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                    {tier}
                  </label>
                  <input
                    type="number"
                    value={formData.tier_multipliers[tier]}
                    onChange={(e) => handleTierChange(e, tier)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <StyledButton name="Cancel" onClick={onClose} variant="tertiary" />
            <StyledButton name="Save Rules" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRedemption;
