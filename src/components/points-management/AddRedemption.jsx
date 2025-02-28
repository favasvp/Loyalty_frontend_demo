import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";

const AddRedemption = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    minimumPoints: "",
    maximumPerDay: "",
    tierMultipliers: {
      silver: "",
      gold: "",
      platinum: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Form Data Submitted:", formData);
      onSuccess();
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to add category" });
    } finally {
      setIsLoading(false);
    }
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
      tierMultipliers: {
        ...prev.tierMultipliers,
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
                name="minimumPoints"
                value={formData.minimumPoints}
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
                name="maximumPerDay"
                value={formData.maximumPerDay}
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
                    value={formData.tierMultipliers[tier]}
                    onChange={(e) => handleTierChange(e, tier)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"

                  />
                </div>
              ))}
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

export default AddRedemption;
