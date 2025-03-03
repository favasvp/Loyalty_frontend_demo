import React, { useMemo, useState } from "react";
import RefreshButton from "../../ui/RefreshButton";
import ReportCard from "../../components/reports/ReportCard";
import DoughnutChart from "../../ui/DoughnutChart";
import {
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import StyledTable from "../../ui/StyledTable";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    { id: 1, name: "John Doe", pointsRequired: 120, status: "Active" },
    { id: 2, name: "Jane Smith", pointsRequired: 90, status: "Inactive" },
    { id: 3, name: "Alice Johnson", pointsRequired: 150, status: "Active" },
    { id: 4, name: "Michael Brown", pointsRequired: 80, status: "Pending" },
    { id: 5, name: "Emily Davis", pointsRequired: 110, status: "Active" },
  ]);
  const chartData = {
    labels: ["Mobile App", "Website"],
    datasets: [
      {
        data: [50000, 40000],
        backgroundColor: ["#2B5C3F", "#4C9067"],
        borderWidth: 0,
      },
    ],
  };

  const mobileAppData = {
    title: "Mobile App",
    points: 50000,
    transactions: 1200,
    activeUsers: 450,
    platform: "iOS & Android",
    trend: 12,
    trendDirection: "up",
    Icon: DevicePhoneMobileIcon,
  };

  const websiteData = {
    title: "Website",
    points: 40000,
    transactions: 900,
    activeUsers: 300,
    platform: "Web",
    trend: 8,
    trendDirection: "down",
    Icon: GlobeAltIcon,
  };
  const tableRows = useMemo(() => {
    return data.map((item) => (
      <tr key={item.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.pointsRequired}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 py-1 text-xs font-medium rounded-full">
            {item.status}
          </span>
        </td>
      </tr>
    ));
  }, [data]);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Last Updated: {lastUpdated ? lastUpdated : "Fetching..."}
          </span>
          <RefreshButton />
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "Overview"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setActiveTab("Overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "Customers"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setActiveTab("Customers")}
        >
          Customers
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Points Distribution</h2>
          <div className="w-full h-96 flex items-center justify-center">
            <DoughnutChart data={chartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <ReportCard {...mobileAppData} />
          <ReportCard {...websiteData} />
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Detailed Metrics
        </h3>
          {" "}
          <StyledTable
            paginationProps={{
              currentPage,
              totalCount,
              itemsPerPage,
              setCurrentPage,
              setItemsPerPage,
            }}
          >
            <thead className="bg-gray-50 w-full">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableRows}
            </tbody>
          </StyledTable>
      
      </div>
    </div>
  );
};

export default Reports;
