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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.map((role) => (
            <div
              key={role.id}
              className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:border-indigo-100 hover:shadow transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium">{role.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {role.description}
                  </p>
                </div>
                <div className="flex space-x-1 ml-3">
                  <button className="text-gray-400 hover:text-indigo-500 p-1.5 rounded-md hover:bg-indigo-50 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  Permissions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {role.permissions.map((perm, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-50 text-gray-700 px-2 py-1 text-xs rounded-md"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
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
