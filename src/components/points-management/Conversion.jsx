import { useMemo, useState } from "react";
import StyledButton from "../../ui/StyledButton";
import StyledTable from "../../ui/StyledTable";
import AddConversion from "./AddConversion";

export const Conversion = () => {
     const [itemsPerPage, setItemsPerPage] = useState(10);
     const[open, setOpen] = useState(false);
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
      <div className="flex justify-end mt-6">
        <StyledButton
          name={"Configure"}
          variant="primary"
          onClick={() => setOpen(true)}
        />
      </div>
      <AddConversion isOpen={open} onClose={() => setOpen(false)} onSuccess={() => {}} />
    </div>
  );
};
