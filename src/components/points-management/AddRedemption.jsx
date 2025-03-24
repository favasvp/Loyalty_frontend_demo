import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRedemptionRules } from "../../hooks/useRedemptionRules";
import useUiStore from "../../store/ui";
import { useTiers } from "../../hooks/useTiers";

const AddRedemption = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;

  const { useGetTiers } = useTiers();
  const { data: Tiers } = useGetTiers();

  const [formData, setFormData] = useState({
    minimum_points_required: "",
    maximum_points_per_day: "",
    tier_multipliers: [],
  });

  const { useUpdateRedemptionRules } = useRedemptionRules();
  const updateMutation = useUpdateRedemptionRules();
  const { addToast } = useUiStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Tiers?.data) {
      const allTiers = Tiers?.data.map((tier) => ({
        tier_id: tier._id, 
        multiplier: 1, 
      }));

      if (editData) {
        const updatedMultipliers = allTiers.map((tier) => {
          const existingMultiplier = editData?.tier_multipliers?.find(
            (item) => item?.tier_id?._id === tier.tier_id
          );
          return {
            tier_id: tier.tier_id,
            multiplier: existingMultiplier ? existingMultiplier.multiplier : 0,
          };
        });

        setFormData({
          minimum_points_required: editData?.minimum_points_required || "",
          maximum_points_per_day: editData?.maximum_points_per_day || "",
          tier_multipliers: updatedMultipliers,
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          tier_multipliers: allTiers,
        }));
      }
    }
  }, [editData, Tiers]);

  const handleMultiplierChange = (index, value) => {
    setFormData((prev) => {
      const updatedMultipliers = [...prev.tier_multipliers];
      updatedMultipliers[index].multiplier = value;
      return { ...prev, tier_multipliers: updatedMultipliers };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    updateMutation.mutate(formData, {
      onSuccess: (data) => {
        addToast({
          type: "success",
          message: data?.message || "Redemption rules updated successfully",
        });
        setIsLoading(false);
        onClose?.();
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: error?.response?.data?.message || "Failed to update redemption rules",
        });
        setIsLoading(false);
      },
    });
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
            Redemption Rules Configuration
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
                <label className={labelClass}>Minimum Points Required</label>
                <input
                  type="number"
                  name="minimum_points_required"
                  value={formData.minimum_points_required}
                  onChange={(e) =>
                    setFormData({ ...formData, minimum_points_required: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter minimum points"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Minimum points needed for redemption
                </div>
              </div>
              <div>
                <label className={labelClass}>Maximum Points Per Day</label>
                <input
                  type="number"
                  name="maximum_points_per_day"
                  value={formData.maximum_points_per_day}
                  onChange={(e) =>
                    setFormData({ ...formData, maximum_points_per_day: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter maximum points"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Maximum points redeemable per day
                </div>
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className={sectionHeadingClass}>Tier Multipliers</h3>
            <div className="space-y-3">
              {formData.tier_multipliers.map((tierMultiplier, index) => {
                const tierName = Tiers?.data?.find((tier) => tier._id === tierMultiplier.tier_id)?.name;

                return (
                  <div key={tierMultiplier.tier_id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="w-24 text-sm text-gray-700 font-medium">
                      {tierName}
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={tierMultiplier.multiplier}
                        onChange={(e) => handleMultiplierChange(index, e.target.value)}
                        className={inputClass}
                        placeholder="Multiplier value"
                      />
                    </div>
                  </div>
                );
              })}
              <div className="text-xs text-gray-500 mt-1">
                Multipliers for maximum points per day based on member tier
              </div>
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

export default AddRedemption;