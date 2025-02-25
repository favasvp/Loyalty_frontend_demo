import React from "react";

const PointsCard = ({ criteria,onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
    onClick={onClick}>
      <div className="flex items-center gap-4 mb-2">
        <div className="text-3xl">{criteria?.icon}</div>
        <div>
          <h3 className="font-medium text-gray-900 text-sm pb-1">
            {criteria?.name}
          </h3>
          <p className="text-xs text-gray-500">{criteria?.description}</p>
        </div>
      </div>

      <div className="mt-auto flex justify-between items-center">
        <span className="text-sm font-medium text-green-600">
          {criteria?.pointsFormula}
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          {criteria?.type}
        </span>
      </div>
    </div>
  );
};

export default PointsCard;
