import React, { useMemo, useState } from "react";
import StyledSearchInput from "../../ui/StyledSearchInput";
import RefreshButton from "../../ui/RefreshButton";
import StyledTable from "../../ui/StyledTable";
import Loader from "../../ui/Loader";
import { useAppTypes } from "../../hooks/useAppTypes";

const Apps = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState("");
  const { useGetAppTypes } = useAppTypes();
  const { data: appTypes, isLoading, error, refetch } = useGetAppTypes();

  const tableRows = useMemo(() => {
    return appTypes?.data?.map((item) => (
      <tr key={item.id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item?.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <img src={item?.icon} alt="icon" className="w-6 h-6 object-contain" />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item?.description}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              item?.status
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item?.status ? "Active" : "Inactive"}
          </span>
        </td>
      </tr>
    ));
  }, [appTypes]);
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
          <RefreshButton onClick={() => refetch()} isLoading={isLoading} />
          <StyledSearchInput
            placeholder="Search"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
      {isLoading ? (
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
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
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
