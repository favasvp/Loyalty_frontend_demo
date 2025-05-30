import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const PointsCard = ({ criteria, onClick, onEdit, onDelete }) => {
  // Format dates for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full relative"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Edit"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Delete"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center mb-3">
        {criteria?.serviceType?.icon && (
          <img
            src={criteria.serviceType.icon}
            alt={criteria.serviceType?.name?.en}
            className="w-10 h-10 mr-3 rounded"
          />
        )}
        <div className="pr-6">
          <h3 className="text-sm font-medium text-gray-900">
            {criteria?.eventType?.name?.en}
          </h3>
          <p className="text-xs text-gray-500">
            {criteria?.serviceType?.title?.en}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {criteria?.description && (
          <p className="text-xs text-gray-600">
            {criteria.description?.en}
          </p>
        )}
        <div className="text-xs text-gray-600">
          <p><span className="font-medium">Code:</span> {criteria?.unique_code}</p>
          <p>
            <span className="font-medium">Valid:</span>{' '}
            {formatDate(criteria?.startDate)} - {formatDate(criteria?.endDate)}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-3">
        <div className="flex flex-wrap gap-1">
          {criteria?.eventType?.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
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