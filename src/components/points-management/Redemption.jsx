import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";
import {
  ChartBarIcon,
  CursorArrowRippleIcon,
  HashtagIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import AddRedemption from "./AddRedemption";
import { useRedemptionRules } from "../../hooks/useRedemptionRules";

const Redemption = () => {
  const [open, setOpen] = useState(false);

  const { useGetRedemptionRules } = useRedemptionRules();
  const { isLoading, data: ruleData } = useGetRedemptionRules();

  return (
    <div className="p-0 rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Redemption Rules
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Set up point redemption criteria, thresholds, and restrictions.
        </p>
      </div>

      <div className="bg-white rounded-lg p-5 shadow-xs border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <HashtagIcon className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500">Minimum Points</p>
                <p className="font-medium text-gray-800">
                  {ruleData?.data[0]?.minimum_points_required}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <CursorArrowRippleIcon className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500">Max Points/Day</p>
                <p className="font-medium text-gray-800">
                  {ruleData?.data[0]?.maximum_points_per_day}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-3">
              <ChartBarIcon className="w-4 h-4 text-indigo-500" />
              Tier Multipliers
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {ruleData?.data[0]?.tier_multipliers?.map(
                ({ tier_id, multiplier }) => (
                  <div
                    key={tier_id?.name}
                    className="flex items-center gap-2 bg-gray-50 p-3 rounded-md"
                  >
                    <div
                      className="flex-shrink-0 w-2 h-8 rounded-full"
                      style={{
                        backgroundColor:
                          tier_id?.name?.toLowerCase() === "silver"
                            ? "#C0C0C0"
                            : tier_id?.name?.toLowerCase() === "gold"
                            ? "#FFD700"
                            : "#E5E4E2",
                      }}
                    />
                    <div>
                      <p className="text-xs text-gray-500 capitalize">
                        {tier_id?.name}
                      </p>
                      <p className="font-medium text-gray-800">x{multiplier}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <StyledButton
            name="Configure"
            variant="primary"
            onClick={() => setOpen(true)}
            className="text-sm"
          />
        </div>
      </div>

      <AddRedemption
        isOpen={open}
        onClose={() => setOpen(false)}
        editData={ruleData?.data[0]}
      />
    </div>
  );
};

export default Redemption;
