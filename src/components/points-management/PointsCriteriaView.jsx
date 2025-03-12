import React from "react";
import { usePointsCriteria } from "../../hooks/usePointsCriteria";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PointsCriteriaView = ({ open, onClose, id }) => {
  const { useGetPointsCriteriaById } = usePointsCriteria();
  const { data: selectedCriteria } = useGetPointsCriteriaById(id);

  if (!open) return null;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl min-h-[500px] max-h-[60vh] overflow-y-auto p-6 mt-17 custom-scrollbar">
        <div className="absolute right-4 top-4 z-10">
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full bg-white/90 text-gray-500 hover:text-gray-900 transition shadow-sm"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="flex items-center gap-4">
              {selectedCriteria?.data?.appType?.icon && (
                <img
                  src={selectedCriteria?.data?.appType.icon}
                  alt={selectedCriteria?.data?.appType.name}
                  className="w-14 h-14 rounded-lg shadow-sm"
                />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedCriteria?.data?.appType?.name || "Loyalty Program"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {selectedCriteria?.data?.appType?.description || ""}
                </p>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCriteria?.data?.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedCriteria?.data?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <h3 className="text-gray-800 font-medium mb-3 text-sm uppercase tracking-wide">
                  Event Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium">
                      {selectedCriteria?.data?.eventType?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Description</span>
                    <span>
                      {selectedCriteria?.data?.eventType?.description || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedCriteria?.data?.eventType?.tags?.map(
                      (tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <h3 className="text-gray-800 font-medium mb-3 text-sm uppercase tracking-wide">
                  Service Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Title</span>
                    <span className="font-medium">
                      {selectedCriteria?.data?.serviceType?.title || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Description</span>
                    <span>
                      {selectedCriteria?.data?.serviceType?.description ||
                        "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="text-gray-800 font-medium mb-3 text-sm uppercase tracking-wide">
                Transaction Conditions
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <span className="text-xs text-gray-500 font-medium">
                    Transaction Limits
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500">Weekly</div>
                      <div className="text-lg font-medium">
                        {selectedCriteria?.data?.conditions?.maxTransactions
                          ?.weekly || "—"}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500">Monthly</div>
                      <div className="text-lg font-medium">
                        {selectedCriteria?.data?.conditions?.maxTransactions
                          ?.monthly || "—"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs text-gray-500 font-medium">
                    Value Limits
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500">Minimum</div>
                      <div className="text-lg font-medium">
                        $
                        {selectedCriteria?.data?.conditions
                          ?.transactionValueLimits?.minValue || "—"}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500">Maximum</div>
                      <div className="text-lg font-medium">
                        $
                        {selectedCriteria?.data?.conditions
                          ?.transactionValueLimits?.maxValue || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="text-gray-800 font-medium mb-3 text-sm uppercase tracking-wide">
                Point System
              </h3>

              <div className="overflow-hidden rounded-lg border border-gray-100">
                {selectedCriteria?.data?.pointSystem?.map((point, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-3 text-sm ${
                      index > 0 ? "border-t border-gray-100" : ""
                    }`}
                  >
                    <div className="p-3 bg-gray-50">{point.paymentMethod}</div>
                    <div className="p-3 capitalize">{point.pointType}</div>
                    <div className="p-3 font-medium">
                      {point.pointType === "percentage"
                        ? `${point.pointRate}%`
                        : point.pointRate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 pt-2">
              <div>
                Created: {formatDate(selectedCriteria?.data?.createdAt)}
              </div>
              <div>
                Updated: {formatDate(selectedCriteria?.data?.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsCriteriaView;
