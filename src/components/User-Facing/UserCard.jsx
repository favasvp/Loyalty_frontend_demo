import { useState, useEffect } from "react";
import khedmah from "../../assets/Frame 92.png";
import bronze from "../../assets/bronze.png";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import sdkApi from "../../api/sdk";

const UserCard = () => {
  const [user, setUser] = useState({
    name: "",
    membership: "Bronze",
    points: 0,
    nextTierPoints: 5000,
    avatar: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  const customerID = queryParams.get("customerID");
  const apiKey = queryParams.get("apiKey");

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!customerID || !apiKey) {
        setError("Customer ID and API Key are required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await sdkApi.getCustomerDetails(customerID, apiKey);

        if (response.status === 200 && response.data) {
          const customerData = response.data;

          // Get tier name (default to Bronze if not available)
          const tierName = customerData.customer_tier?.en || "Bronze";

          setUser({
            name: customerData.name || "Customer",
            membership: tierName,
            points: customerData.point_balance || 0,
            nextTierPoints: getTierNextPoints(
              tierName,
              customerData.point_balance || 0
            ),
            avatar: null,
          });
        } else {
          setError("Failed to fetch customer data");
        }
      } catch (err) {
        console.error("Error fetching customer data:", err);
        setError("Error loading customer information");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerID, apiKey]);

  // Helper function to determine next tier points
  const getTierNextPoints = (currentTier, currentPoints) => {
    const tierThresholds = {
      Bronze: 5000,
      Silver: 15000,
      Gold: 50000,
      Platinum: 100000,
    };

    const tiers = Object.keys(tierThresholds);
    const currentTierIndex = tiers.findIndex((tier) => tier === currentTier);

    if (currentTierIndex === -1 || currentTierIndex === tiers.length - 1) {
      return Math.max(currentPoints + 10000, 10000); // Default for unknown or highest tier
    }

    const nextTier = tiers[currentTierIndex + 1];
    return tierThresholds[nextTier];
  };

  const pointsToNext = user.nextTierPoints - user.points;
  const progressPercent = Math.min(
    (user.points / user.nextTierPoints) * 100,
    100
  );
  const formatPoints = (num) => num.toLocaleString("de-DE");

  if (loading) {
    return (
      <div className="bg-white rounded-2xl max-w-md mx-auto overflow-hidden p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-2 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl max-w-md mx-auto overflow-hidden p-6">
        <div className="text-center">
          <p className="text-red-500 text-sm">{error}</p>
          <p className="text-gray-500 text-xs mt-2">
            Please check your URL parameters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl max-w-md mx-auto overflow-hidden ">
      <div className="flex justify-between items-start px-4 py-4">
        <div>
          <h2 className="text-[#737373] text-sm font-semibold poppins-text mb-1">
            Welcome
          </h2>
          <h1 className="text-[#4A4A4A] text-base font-semibold poppins-text">
            {user.name} !
          </h1>
        </div>
        <img
          src={khedmah}
          alt="Khedmah Logo"
          className="w-11 h-11 rounded-lg"
        />
      </div>

      <div className="relative flex items-center px-4 mb-2">
        <img
          src={bronze}
          alt="Bronze Badge"
          className="absolute left-[-12px] top-1/3 -translate-y-1/2 w-29 h-29 z-0 "
          style={{ pointerEvents: "none" }}
        />
        <div className="relative z-10 pl-20 flex flex-col">
          <span className="text-[#2F2F2F] font-semibold text-xl leading-none poppins-text">
            {user.membership}
          </span>
          <div className="flex items-center mt-1 text-[#828282] text-xs">
            <span className="poppins-text">{formatPoints(user.points)}</span>
            <span className=" ml-1 poppins-text">Points</span>
            <ChevronRightIcon className="w-4 h-4  ml-1" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-[#E39C75] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span className="text-[#8E8E8E] text-[12px] poppins-text">
          {pointsToNext > 0
            ? `${formatPoints(pointsToNext)} Points to next tier`
            : "Maximum tier reached"}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
