import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const PointsCard = ({ criteria, onClick, onEdit, onDelete }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all cursor-pointer flex flex-col relative border border-gray-100"
    >
      {/* Top Right Icons */}
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Edit"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Delete"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center mb-2">
        {criteria?.serviceType?.icon && (
          <img
            src={criteria.serviceType.icon}
            alt={criteria.serviceType?.name?.en}
            className="w-8 h-8 mr-2 rounded-full border border-gray-100"
          />
        )}
        <div>
          <h3 className="text-sm font-medium text-gray-800 leading-tight">
            {criteria?.eventType?.name?.en}
          </h3>
          <p className="text-xs text-gray-500">
            {criteria?.serviceType?.title?.en}
          </p>
        </div>
      </div>

      {/* Code - Emphasized */}
      <div className="my-2">
        <div className="bg-gray-200 text-gray-900 inline-block px-3 py-1 rounded font-mono text-sm font-medium">
          <span className="font-semibold">Code:</span> {criteria?.unique_code}
        </div>
      </div>

      {/* Validity */}
      <div className="text-xs text-gray-600">
        <p>
          <span className="font-medium">Valid:</span>{" "}
          {formatDate(criteria?.startDate)} - {formatDate(criteria?.endDate)}
        </p>
      </div>

      {/* Tags */}
      {criteria?.eventType?.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {criteria?.eventType?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-50 text-teal-600 text-xs font-medium px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PointsCard;