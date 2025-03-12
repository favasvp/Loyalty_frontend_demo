import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { useRedemptionRules } from "../../hooks/useRedemptionRules";
import useUiStore from "../../store/ui";
import { useTiers } from "../../hooks/useTiers";

const AddRedemption = ({ isOpen, onClose, editData }) => {
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
  useEffect(() => {
    if (editData) {
      setFormData({
        minimum_points_required: editData?.minimum_points_required || "",
        maximum_points_per_day: editData?.maximum_points_per_day || "",
        tier_multipliers: editData?.tier_multipliers?.map((item) => ({
          tier_id: item?.tier_id?._id, 
          multiplier: item?.multiplier || 1,
        })) || [],
      });
    } else if (Tiers?.data) {
      setFormData((prev) => ({
        ...prev,
        tier_multipliers: Tiers?.data.map((tier) => ({
          tier_id: tier.id, 
          multiplier: 1, 
        })),
      }));
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
                onChange={(e) =>
                  setFormData({ ...formData, minimum_points_required: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, maximum_points_per_day: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Tier Multipliers - for maximum points per day
            </h4>
            <div className="space-y-3">
              {formData.tier_multipliers.map((tierMultiplier, index) => {
              const tierName = Tiers?.data?.find((tier) => tier._id === tierMultiplier.tier_id)?.name;


                return (
                  <div key={tierMultiplier.tier_id} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium text-gray-700">
                      {tierName}
                    </span>
                    <input
                      type="number"
                      value={tierMultiplier.multiplier}
                      onChange={(e) => handleMultiplierChange(index, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                );
              })}
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
