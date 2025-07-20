import { useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { useCoinConvertionRule } from "../../hooks/useCoinConvertionRule";
import AddConversion from "./AddConversion";

export const Conversion = () => {
  const [open, setOpen] = useState(false);
  const { useGetCoinConvertionRule } = useCoinConvertionRule();
  const { data: ruleData } = useGetCoinConvertionRule();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Points to Baiza Conversion</h3>
      <p className="text-sm text-gray-600 mb-4">
        Manage conversion rates between loyalty points and baiza.
      </p>
      <div className="bg-white rounded-lg p-5 shadow-xs border border-gray-100 mb-6">
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-md">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">
              1 Point = {ruleData?.data[0]?.pointsPerCoin || 0} Baiza
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Current Conversion Rate
            </p>
          </div>
        </div>

        {/* <div className="flex justify-end mt-6">
          <StyledButton
            name="Configure Conversion Rate"
            variant="primary"
            onClick={() => setOpen(true)}
            className="text-sm"
          />
        </div> */}
      </div>

      {/* <AddConversion
        isOpen={open}
        onClose={() => setOpen(false)}
        editData={ruleData?.data[0]}
      /> */}
    </div>
  );
};
