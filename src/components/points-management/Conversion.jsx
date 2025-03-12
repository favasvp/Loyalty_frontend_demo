import { useMemo, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import StyledTable from "../../ui/StyledTable";
import AddConversion from "./AddConversion";
import {
  ArrowUpIcon,
  BellIcon,
  ChartBarIcon,
  ClockIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { useCoinConvertionRule } from "../../hooks/useCoinConvertionRule";

export const Conversion = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
 const { useGetCoinConvertionRule } = useCoinConvertionRule();
  const { isLoading, data: ruleData } = useGetCoinConvertionRule();

    const [data, setData] = useState([
      { id: 1, name: "John Doe", pointsRequired: 120, status: "Active" },
      { id: 2, name: "Jane Smith", pointsRequired: 90, status: "Inactive" },
      { id: 3, name: "Alice Johnson", pointsRequired: 150, status: "Active" },
      { id: 4, name: "Michael Brown", pointsRequired: 80, status: "Pending" },
      { id: 5, name: "Emily Davis", pointsRequired: 110, status: "Active" },
    ]);
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
      <h3 className="text-lg font-semibold mb-3">Points Conversion</h3>
      <p className="text-sm text-gray-600 mb-4">
        Manage conversion rates between points and Khedmah coins.
      </p>
      <div className="bg-white rounded-lg p-5 shadow-xs border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
          <GiftIcon className="w-5 h-5 text-indigo-500" />
          <div>
            <p className="text-xs text-gray-500">Minimum Points</p>
            <p className="font-medium text-gray-800">
              {ruleData?.data[0]?.minimumPoints} points
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
          <ArrowUpIcon className="w-5 h-5 text-indigo-500" />
          <div>
            <p className="text-xs text-gray-500">Maximum Per Day</p>
            <p className="font-medium text-gray-800">
              {ruleData?.data[0]?.pointsPerCoin} points
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <ChartBarIcon className="w-4 h-4 text-indigo-500" />
          Tier Bonuses (%)
        </p>
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(ruleData?.data[0]?.tierBonuses || {})?.map(([tier, bonus]) => (
            <div
              key={tier}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
            >
              <div
                className="flex-shrink-0 w-2 h-8 rounded-full"
                style={{
                  backgroundColor:
                    tier === 'silver'
                      ? '#C0C0C0'
                      : tier === 'gold'
                      ? '#FFD700'
                      : '#E5E4E2',
                }}
              />
              <div>
                <p className="text-xs text-gray-500 capitalize">{tier}</p>
                <p className="font-medium text-gray-800">{bonus}% bonus</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>

      <div className="flex justify-end mt-6">
        <StyledButton
          name="Configure"
          variant="primary"
          onClick={() => setOpen(true)}
          className="text-sm"
        />
      </div>
    </div>
      {/* <StyledTable
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
        <tbody className="bg-white divide-y divide-gray-200">{tableRows}</tbody>
      </StyledTable> */}

      <AddConversion
        isOpen={open}
        onClose={() => setOpen(false)}
        editData={ruleData?.data[0]}
      />
    </div>
  );
};
