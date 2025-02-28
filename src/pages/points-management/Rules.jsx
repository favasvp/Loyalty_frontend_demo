import {
  ArrowPathIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Redemption from "../../components/points-management/Redemption";
import Expiration from "../../components/points-management/Expiration";
import { Conversion } from "../../components/points-management/Conversion";

const Rules = () => {
  const tabs = [
    { id: "redemption", label: "Redemption Rules", icon: ArrowPathIcon },
    { id: "expiration", label: "Expiration Rules", icon: ClockIcon },
    { id: "conversion", label: "Points Conversion", icon: CurrencyDollarIcon },
  ];
  const [activeTab, setActiveTab] = useState("redemption");

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          {" "}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Rules & Expiry
          </h1>
        </div>
      </div>
      <div className="space-y-6">
        {" "}
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
          {" "}
          {activeTab === "redemption" && <Redemption />}
          {activeTab === "expiration" && <Expiration />}
          {activeTab === "conversion" && <Conversion />}
        </div>
      </div>
    </>
  );
};

export default Rules;
