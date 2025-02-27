import React, { useMemo, useState } from "react";
import StyledTable from "../../ui/StyledTable";

const Privacy = () => {
  const [activeTab, setActiveTab] = useState("security-log");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const data = [
    { id: 1, name: "John Doe", pointsRequired: 120, status: "Active" },
    { id: 2, name: "Jane Smith", pointsRequired: 90, status: "Inactive" },
    { id: 3, name: "Alice Johnson", pointsRequired: 150, status: "Active" },
    { id: 4, name: "Michael Brown", pointsRequired: 80, status: "Pending" },
    { id: 5, name: "Emily Davis", pointsRequired: 110, status: "Active" },
  ];
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Privacy & Security
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage privacy settings and security configurations
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "security-log"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("security-log")}
          >
            Security Audit Log
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "role-log"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("role-log")}
          >
            Role Audit Log
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "security-log" && (
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
        )}

        {activeTab === "role-log" && (
          <div>
            <h2 className="text-lg font-semibold">Role Audit Log</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Privacy;
