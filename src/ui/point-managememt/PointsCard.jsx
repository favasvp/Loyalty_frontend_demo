import React from "react";

const PointsCard = ({ criteria, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-2">
        {criteria?.eventType?.icon && (
          <img
            src={criteria.eventType.icon}
            alt="Event Icon"
            className="w-12 h-12 object-contain"
          />
        )}

        <div>
          <h3 className="font-medium text-gray-900 text-sm pb-1">
            {criteria?.serviceType?.title}
          </h3>
          <p className="text-xs text-gray-500">{criteria?.description}</p>
        </div>
      </div>

      <div className="mt-auto flex justify-between items-center">
        <span className="text-sm font-medium text-green-600">
          {criteria?.pointsFormula}
        </span>

        <div className="flex gap-1">
          {criteria?.eventType?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsCard;
