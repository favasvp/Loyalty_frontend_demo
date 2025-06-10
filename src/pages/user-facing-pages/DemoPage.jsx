import { useState } from "react";
import UserDashboard from "./UserDashboard";
import PointsHistory from "./PointsHistory";
import OffersPage from "./OffersPage";
import CouponDetails from "./CouponDetails";
import UserProfile from "./UserProfile";
import UserLayout from "./UserLayout";

const DemoPage = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <UserDashboard />;
      case "history":
        return <PointsHistory />;
      case "offers":
        return <OffersPage />;
      case "coupon":
        return <CouponDetails />;
      case "profile":
        return <UserProfile />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen shadow-lg">
      {/* Demo Navigation */}
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-lg font-semibold mb-4">
          Kedmah Loyalty - User Demo
        </h1>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`p-2 rounded text-sm ${
              currentPage === "dashboard"
                ? "bg-orange-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage("history")}
            className={`p-2 rounded text-sm ${
              currentPage === "history"
                ? "bg-orange-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            History
          </button>
          <button
            onClick={() => setCurrentPage("offers")}
            className={`p-2 rounded text-sm ${
              currentPage === "offers"
                ? "bg-orange-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Offers
          </button>
          <button
            onClick={() => setCurrentPage("coupon")}
            className={`p-2 rounded text-sm ${
              currentPage === "coupon"
                ? "bg-orange-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Coupon
          </button>
          <button
            onClick={() => setCurrentPage("profile")}
            className={`p-2 rounded text-sm ${
              currentPage === "profile"
                ? "bg-orange-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {/* Mobile App Container */}
      <div className="relative">{renderCurrentPage()}</div>
    </div>
  );
};

export default DemoPage;
