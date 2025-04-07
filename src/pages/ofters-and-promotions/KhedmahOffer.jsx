import { useState } from "react";
import {
  ArrowDownTrayIcon,
  Squares2X2Icon,
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import RefreshButton from "../../ui/RefreshButton";
import StyledButton from "../../ui/StyledButton";
import StyledSearchInput from "../../ui/StyledSearchInput";
import DeleteModal from "../../ui/DeleteModal";
import Loader from "../../ui/Loader";
import AddOffer from "../../components/ofters-and-promotions/AddOffer";

const KhedmahOffer = () => {
  const [activeView, setActiveView] = useState("grid");
  const [addOpen, setAddOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [offer, setOffer] = useState({
    id: 1,
    logo: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fDB8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    merchantName: "Grocery Store",
    title: "Buy 1 Get 1 Free",
    pointsRequired: "100",
    validUntil: "2023-12-31",
    status: "Active",
  });
  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await
  //     setOffer(response?.data || []);
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Khedmah Offers
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {" "}
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
          <StyledButton
            name={
              <>
                <ArrowDownTrayIcon className="w-4 h-4" /> Export
              </>
            }
            variant="download"
          />
          <StyledButton
            name={
              <>
                <span className="text-lg leading-none">+</span> Add 
                Offer
              </>
            }
            onClick={() => {
              setAddOpen(true);
            }}
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 pb-3">
        <button
          className={`p-2 rounded-md transition ${
            activeView === "grid"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveView("grid")}
        >
          <Squares2X2Icon className="w-5 h-5" />
        </button>
        <button
          className={`p-2 rounded-md transition ${
            activeView === "list"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveView("list")}
        >
          <ListBulletIcon className="w-5 h-5" />
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-6">
          <div
            className={`${
              activeView === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                : "space-y-3"
            }`}
          >
            {activeView === "grid" ? (
              <div
                key={offer.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={offer.logo}
                    alt={`${offer.merchantName} Logo`}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-50 p-1"
                  />
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {offer.merchantName}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {offer.title}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm my-3">
                  <div className="text-xs">
                    <span className="text-gray-500">Points</span>
                    <p className="font-medium text-gray-900">
                      {offer.pointsRequired}
                    </p>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-500">Valid Until</span>
                    <p className="font-medium text-gray-900">
                      {offer.validUntil}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      offer.status.toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {offer.status}
                  </span>
                  <div className="flex gap-3">
                    <button className="text-gray-600 hover:text-gray-900 transition">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700 transition"
                      onClick={() => setDeleteOpen(true)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={offer.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={offer.logo}
                    alt={`${offer.merchantName} Logo`}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-50 p-1"
                  />
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {offer.merchantName}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {offer.title}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col sm:flex-row items-center gap-6  sm:text-sm">
                    <div className="text-center text-xs">
                      <span className="text-gray-500 ">Points</span>
                      <p className="font-medium text-gray-900">
                        {offer.pointsRequired}
                      </p>
                    </div>
                    <div className="text-center text-xs">
                      <span className="text-gray-500 ">Valid Until</span>
                      <p className="font-medium text-gray-900">
                        {offer.validUntil}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          offer.status.toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900 transition">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700 transition"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <DeleteModal
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={() => setDeleteOpen(false)}
            data={"offer"}
          />
          <AddOffer
            isOpen={addOpen}
            onClose={() => {
              setAddOpen(false);
              // setData(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default KhedmahOffer;

