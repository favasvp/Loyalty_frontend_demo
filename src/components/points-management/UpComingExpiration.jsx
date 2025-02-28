import { useState, useEffect } from "react";
import { CalendarIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Loader from "../../ui/Loader";

const UpcomingExpiration = () => {
  const [expirations, setExpirations] = useState([
    {
      customerId: "CUST123",
      customerName: "John Doe",
      points: 1000,
      expiryDate: "2024-04-01",
      daysRemaining: 30,
      tier: "Gold",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("30");

  return (
    <div className="space-y-8"> {/* Increased spacing */}
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Upcoming Point Expirations
        </h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-md border border-gray-300 text-sm px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-gray-200"
        >
          <option value="7">Next 7 days</option>
          <option value="30">Next 30 days</option>
          <option value="90">Next 90 days</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          {expirations?.map((exp) => (
            <div key={exp.customerId} className="p-6 space-y-4"> {/* Increased padding */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-gray-900">{exp.customerName}</h3>
                  <p className="text-sm text-gray-500">ID: {exp.customerId}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {exp.points.toLocaleString()} points
                  </p>
                  <p className="text-sm text-gray-500">Tier: {exp.tier}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center text-yellow-600 font-medium">
                  <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                  <span>Expires in {exp.daysRemaining} days</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="font-medium">
                    {new Date(exp.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingExpiration;
