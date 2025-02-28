import React, { useMemo, useState } from "react";
import StyledSearchInput from "../../ui/StyledSearchInput";
import RefreshButton from "../../ui/RefreshButton";
import StyledTable from "../../ui/StyledTable";
import Loader from "../../ui/Loader";

const Apps = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "John Doe", pointsRequired: 120, status: "Active" },
    { id: 2, name: "Jane Smith", pointsRequired: 90, status: "Inactive" },
    { id: 3, name: "Alice Johnson", pointsRequired: 150, status: "Active" },
    { id: 4, name: "Michael Brown", pointsRequired: 80, status: "Pending" },
    { id: 5, name: "Emily Davis", pointsRequired: 110, status: "Active" },
  ]);
  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await
  //     setData(response?.data || []);
  //     setLastUpdated(new Date().toLocaleString());
  //     setTotalCount(response?.data?totalCount || 0);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
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
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          {" "}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Apps
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Last Updated: {lastUpdated ? lastUpdated : "Fetching..."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
          <RefreshButton
            //  onClick={fetchData}
            isLoading={loading}
          />
          <StyledSearchInput
            placeholder="Search"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
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
    </>
  );
};

export default Apps;
