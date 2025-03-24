import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCoinConvertionRule } from "../../hooks/useCoinConvertionRule";
import useUiStore from "../../store/ui";
import { useTiers } from "../../hooks/useTiers";

const AddConversion = ({ isOpen, onClose, editData }) => {
  if (!isOpen) return null;

  const { useGetTiers } = useTiers();
  const { data: Tiers } = useGetTiers();

  const [formData, setFormData] = useState({
    minimumPoints: "",
    pointsPerCoin: "",
  });

  const { useCreateCoinManagement } = useCoinConvertionRule();
  const updateMutation = useCreateCoinManagement();
  const { addToast } = useUiStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Tiers?.data) {
      if (editData) {
        setFormData({
          minimumPoints: editData?.minimumPoints || "",
          pointsPerCoin: editData?.pointsPerCoin || "",
        });
      }
    }
  }, [editData, Tiers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    updateMutation.mutate(formData, {
      onSuccess: (data) => {
        addToast({
          type: "success",
          message: data?.message || "Conversion rules updated successfully",
        });
        setIsLoading(false);
        onClose?.();
      },
      onError: (error) => {
        addToast({
          type: "error",
          message:
            error?.response?.data?.message ||
            "Failed to update conversion rules",
        });
        setIsLoading(false);
      },
    });
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
            Points Conversion Rules Configuration
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
            <h3 className={sectionHeadingClass}>Basic Conversion Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Minimum Points</label>
                <input
                  type="number"
                  name="minimumPoints"
                  value={formData.minimumPoints}
                  onChange={(e) =>
                    setFormData({ ...formData, minimumPoints: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter minimum points"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Minimum points needed for conversion
                </div>
              </div>
              <div>
                <label className={labelClass}>Points Per Coin</label>
                <input
                  type="number"
                  name="pointsPerCoin"
                  value={formData.pointsPerCoin}
                  onChange={(e) =>
                    setFormData({ ...formData, pointsPerCoin: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter points per coin"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Number of points required for one coin
                </div>
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

export default AddConversion;
