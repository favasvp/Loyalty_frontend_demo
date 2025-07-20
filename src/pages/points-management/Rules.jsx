import {
  ArrowPathIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Redemption from "../../components/points-management/Redemption";
import Expiration from "../../components/points-management/Expiration";
import { Conversion } from "../../components/points-management/Conversion";
import { useAppTypes } from "../../hooks/useAppTypes";

const Rules = () => {
  const { useGetAppTypes } = useAppTypes();
  const { data: appTypeData } = useGetAppTypes();
  const appTypes = appTypeData?.data;
  const tabs = [
    // { id: "redemption", label: "Redemption Rules", icon: ArrowPathIcon },
    { id: "expiration", label: "Expiration Rules", icon: ClockIcon },
    { id: "conversion", label: "Points Conversion", icon: CurrencyDollarIcon },
  ];
  const [activeTab, setActiveTab] = useState("expiration");
  const [selectedAppType, setSelectedAppType] = useState(appTypes?.[0]?._id);
  useEffect(() => {
    setSelectedAppType(appTypes?.[0]?._id);
  }, [appTypes]);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Rules & Expiry
          </h1>
        </div>
      </div>

      {appTypes && appTypes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">App Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appTypes.map((appType) => (
              <div
                key={appType._id}
                className={`bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4 cursor-pointer 
                  ${
                    selectedAppType === appType._id
                      ? "ring-2 ring-green-500 bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                onClick={() => setSelectedAppType(appType._id)}
              >
                {appType.icon && (
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={appType.icon}
                      alt={appType.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    {appType.name}
                  </p>
                  {appType.description && (
                    <p className="text-xs text-gray-600">
                      {appType.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-6 py-2 text-sm font-medium focus:outline-none transition-all
        ${
          activeTab === tab.id
            ? "border-b-2 border-green-600 text-green-600"
            : "text-gray-500"
        }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          {/* {activeTab === "redemption" && <Redemption id={selectedAppType}/>} */}
          {activeTab === "expiration" && <Expiration id={selectedAppType} />}
          {activeTab === "conversion" && <Conversion />}
        </div>
      </div>
    </>
  );
};

export default Rules;
