import React from "react";
import {
  DevicePhoneMobileIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

const ReportCard = ({ title, points, Icon,transactions, activeUsers, platform, trend, trendDirection }) => {
  const trendIcon = trendDirection === "up" ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
  const trendColor = trendDirection === "up" ? "text-green-600" : "text-red-600";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{points}</p>
          <p className="text-sm text-gray-500">points earned</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Transactions</span>
          <span className="font-medium">{transactions}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Active Users</span>
          <span className="font-medium">{activeUsers}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Platform</span>
          <span className="font-medium">{platform}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 text-sm ${trendColor}`}>
          {React.createElement(trendIcon, { className: "w-4 h-4" })}
          {trend}%
        </span>
        <span className="text-xs text-gray-500">vs previous period</span>
      </div>
    </div>
  );
};

export default ReportCard;
