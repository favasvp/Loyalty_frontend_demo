import { useState, useEffect } from "react";
import khedmah from "../../assets/Frame 92.png";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import sdkApi from "../../api/sdk";
import { getTierTheme, getNextTierInfo } from "./themes/tierThemes";
import { useCustomerAuth } from "../../hooks/useCustomerAuth";

const UserCard = () => {
  const [user, setUser] = useState({
    name: "",
    membership: "Bronze",
    points: 0,
    nextTierPoints: 5000,
    avatar: null,
    requiredPoint: 0,
    nextTierName: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the customer auth hook
  const { customerID, apiKey, isAuthenticated, updateCustomerData } =
    useCustomerAuth();

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!isAuthenticated || !customerID || !apiKey) {
        setError("Customer ID and API Key are required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await sdkApi.getCustomerDetails(customerID, apiKey);

        if (response.status === 200 && response.data) {
          const customerData = response.data;

          // Get tier name (default to Bronze if not available)
          const tierName = customerData.customer_tier?.en || "Bronze";
          const currentPoints = customerData.point_balance || 0;

          // Get next tier info using the theme system
          const nextTierInfo = getNextTierInfo(tierName, currentPoints);
          const requiredPoint = Number(
            customerData.next_tier?.required_point || 0
          );
          const userData = {
            name: customerData.name || "Customer",
            membership: tierName,
            points: currentPoints,
            nextTierPoints: nextTierInfo.nextTier
              ? nextTierInfo.pointsToNext
              : 0,
            avatar: null,
            requiredPoint,
            nextTierName: customerData.next_tier?.en || null,
          };

          setUser(userData);

          // Update the stored customer data
          updateCustomerData(customerData);
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
  }, [customerID, apiKey, isAuthenticated, updateCustomerData]);

  // Get the current tier theme
  const theme = getTierTheme(user.membership);
  const nextTierInfo = getNextTierInfo(user.membership, user.points);
  const formatPoints = (num) => num.toLocaleString("de-DE");

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-2xl max-w-md mx-auto overflow-hidden p-6">
        <div className="text-center">
          <p className="text-red-500 text-sm font-medium">
            Customer ID and API Key are required
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Please access this page with valid customerID and apiKey parameters
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Example: ?customerID=YOUR_ID&apiKey=YOUR_KEY
          </p>
        </div>
      </div>
    );
  }

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
            Please check your authentication or try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${theme.colors.background.card} rounded-2xl max-w-md mx-auto overflow-hidden ${theme.styles.cardBorder} ${theme.colors.shadow}`}
    >
      {/* Background overlay with tier-specific gradient */}
      <div
        className={`absolute inset-0 ${theme.colors.background.overlay} opacity-30 rounded-2xl pointer-events-none`}
      ></div>

      <div className="relative z-10">
        {/* Header section */}
        <div className="flex justify-between items-start px-4 py-4">
          <div>
            <h2
              className={`${theme.styles.welcomeText} text-sm font-semibold poppins-text mb-1`}
            >
              Welcome
            </h2>
            <h1
              className="text-base font-semibold poppins-text"
              style={{ color: theme.colors.text.primary }}
            >
              {user.name} !
            </h1>
          </div>
          <img
            src={khedmah}
            alt="Khedmah Logo"
            className="w-11 h-11 rounded-lg"
          />
        </div>

        {/* Tier badge and points section */}
        <div className="relative flex items-center px-4 mb-2">
          <img
            src={theme.badge}
            alt={`${user.membership} Badge`}
            className={`absolute left-[-12px] top-1/3 -translate-y-1/2 w-29 h-29 z-0 ${theme.styles.badgeGlow}`}
            style={{
              pointerEvents: "none",
              filter:
                user.membership === "Silver"
                  ? "hue-rotate(180deg) saturate(0.5) brightness(1.2)"
                  : user.membership === "Gold"
                  ? "hue-rotate(40deg) saturate(1.5) brightness(1.3)"
                  : user.membership === "Platinum"
                  ? "hue-rotate(200deg) saturate(0.3) brightness(1.4)"
                  : "none",
            }}
          />
          <div className="relative z-10 pl-20 flex flex-col">
            <span
              className="font-semibold text-xl leading-none poppins-text"
              style={{ color: theme.colors.text.primary }}
            >
              {user.membership}
            </span>
            <div className="flex items-center mt-1 text-xs">
              <span
                className="poppins-text"
                style={{ color: theme.colors.text.muted }}
              >
                {formatPoints(user.points)}
              </span>
              <span
                className="ml-1 poppins-text"
                style={{ color: theme.colors.text.muted }}
              >
                Points
              </span>
              <ChevronRightIcon
                className="w-4 h-4 ml-1"
                style={{ color: theme.colors.text.muted }}
              />
            </div>
          </div>
        </div>

        {/* Progress bar section */}
        <div className="px-4 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-[#E39C75] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  user.requiredPoint > 0
                    ? Math.min((user.points / user.requiredPoint) * 100, 100)
                    : 100
                }%`,
              }}
            ></div>
          </div>
          <span className="text-[#8E8E8E] text-[12px] poppins-text">
            {user.requiredPoint > 0 && user.nextTierName
              ? `${formatPoints(user.requiredPoint - user.points)} Points to ${
                  user.nextTierName
                }`
              : `You have reached the highest tier`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
