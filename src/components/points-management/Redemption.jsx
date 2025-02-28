import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";
import {
  ChartBarIcon,
  CursorArrowRippleIcon,
  HashtagIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import AddRedemption from "./AddRedemption";

const Redemption = () => {
  const[open,setOpen]=useState(false);
    const ruleData = {
        minimumPoints: 100,
        maximumPerDay: 1000,
        tierMultipliers: {
          silver: 1,
          gold: 1.5,
          platinum: 2,
        },
      };
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Redemption Rules</h3>
      <p className="text-sm text-gray-600 mb-4">
        Set up point redemption criteria, thresholds, and restrictions.
      </p>
      <div className="p-5  bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-sm ">
          <div className="space-y-5">
            <p className="flex items-center gap-2 text-sm">
              <HashtagIcon className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">Minimum Points:</span>{" "}
              {ruleData.minimumPoints}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <CursorArrowRippleIcon className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">Max Points/Day:</span>{" "}
              {ruleData.maximumPerDay}
            </p>
          </div>
        </div>
        <div className="mt-5 text-sm">
          <p className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
            <ChartBarIcon className="w-4 h-4 text-gray-500" />
            Tier Multipliers:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(ruleData.tierMultipliers).map(
              ([tier, multiplier]) => (
                <div
                  key={tier}
                  className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-xs"
                >
                  <PaperClipIcon className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold capitalize">{tier}</span>: x
                  {multiplier}
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <StyledButton name={"Configure"} variant="primary" onClick={() => setOpen(true)}/>
        </div>
      </div>
      <AddRedemption isOpen={open} onClose={() => setOpen(false)} onSuccess={() => setOpen(false)} />
    </div>
  );
};

export default Redemption;
