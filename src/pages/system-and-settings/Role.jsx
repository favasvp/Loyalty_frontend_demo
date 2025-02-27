import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";
import AddRole from "../../components/system-and-settings/AddRole";
import DeleteModal from "../../ui/DeleteModal";
import RefreshButton from "../../ui/RefreshButton";
import Loader from "../../ui/Loader";

const Role = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access",

      permissions: ["all"],
    },
    {
      id: 2,
      name: "Store Manager",
      description: " Manage store operations and staff",

      permissions: ["manage_store", "view_reports", "manage_staff"],
    },
    {
      id: 3,
      name: "Customer Service",
      description: "Handle customer inquiries and support",

      permissions: ["view_customers", "manage_support", "view_transactions"],
    },
    {
      id: 4,
      name: "Marketing Manager",
      description: "Manage campaigns and promotions",

      permissions: ["manage_campaigns", "view_analytics", "manage_content"],
    },
  ]);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await
  //     setData(response?.data || []);
  //     setLastUpdated(new Date().toLocaleString());
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Role & Access Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastUpdated ? lastUpdated : "Fetching..."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
          <RefreshButton
            //  onClick={fetchData}
            isLoading={loading}
          />
          <StyledButton
            name={
              <>
                <PlusIcon className="w-4 h-4" /> Add Role
              </>
            }
            onClick={() => setAddOpen(true)}
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((role) => (
            <div
              key={role.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 p-1 rounded-lg hover:bg-blue-50">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-700">
                  Permissions:
                </p>
                <ul className="text-sm text-gray-600">
                  {role.permissions.map((perm, index) => (
                    <li
                      key={index}
                      className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md mr-2 mt-1"
                    >
                      {perm}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <AddRole isOpen={addOpen} onClose={() => setAddOpen(false)} />
          <DeleteModal
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={() => setDeleteOpen(false)}
            data={"Role"}
          />
        </div>
      )}
    </>
  );
};

export default Role;
