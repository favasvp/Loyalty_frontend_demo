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
  const [open, setOpen] = useState(false);
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
    <div className=" p-0 rounded-lg ">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Redemption Rules</h3>
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
                <p className="font-medium text-gray-800">{ruleData.minimumPoints}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <CursorArrowRippleIcon className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500">Max Points/Day</p>
                <p className="font-medium text-gray-800">{ruleData.maximumPerDay}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-3">
              <ChartBarIcon className="w-4 h-4 text-indigo-500" />
              Tier Multipliers
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.entries(ruleData.tierMultipliers).map(([tier, multiplier]) => (
                <div
                  key={tier}
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-md"
                >
                  <div className="flex-shrink-0 w-2 h-8 rounded-full" 
                       style={{ 
                         backgroundColor: 
                           tier === "silver" ? "#C0C0C0" : 
                           tier === "gold" ? "#FFD700" : 
                           "#E5E4E2" 
                       }} 
                  />
                  <div>
                    <p className="text-xs text-gray-500 capitalize">{tier}</p>
                    <p className="font-medium text-gray-800">x{multiplier}</p>
                  </div>
                </div>
              ))}
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
        onSuccess={() => setOpen(false)} 
      />
    </div>
  );
};

export default Redemption;