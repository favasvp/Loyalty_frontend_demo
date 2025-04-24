import {
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import DashboardCard from "../ui/Dashboard/DashboardCard";
import RefreshButton from "../ui/RefreshButton";
import RecentCustomers from "../ui/Dashboard/RecentCustomers";
import RecentActivity from "../ui/Dashboard/RecentActivity";
import ActiveOfters from "../ui/Dashboard/ActiveOfters";
import PointsActivity from "../ui/Dashboard/PointsActivity";
import TierDistribution from "../ui/Dashboard/TierDistribution";
import CustomerGrowth from "../ui/Dashboard/CustomerGrowth";
import SegmentAnalaysis from "../ui/Dashboard/SegmentAnalaysis";
import { useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const dashboardData = [
    {
      title: "Total Points Issued",
      total: 12345,
      percentageChange: "+12%",
      color: "text-green-600",
      Icon: BanknotesIcon,
      bg: "bg-green-100",
    },
    {
      title: "Total Users",
      total: 5678,
      percentageChange: "+8%",
      color: "text-blue-600",
      Icon: UsersIcon,
      bg: "bg-blue-100",
    },
    {
      title: "Transactions Processed",
      total: 2340,
      percentageChange: "+5%",
      color: "text-yellow-600",
      Icon: CreditCardIcon,
      bg: "bg-yellow-100",
    },
    {
      title: "Pending Withdrawals",
      total: 890,
      percentageChange: "-3%",
      color: "text-red-600",
      Icon: BanknotesIcon,
      bg: "bg-red-100",
    },
  ];
  const customersData = [
    {
      id: 1,
      name: "John Doe",
      email: "doe@example.com",
      tier: "Gold",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "smith@example.com",
      tier: "Platinum",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "johnson@example.com",
      tier: "Silver",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      tier: "Gold",
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert@example.com",
      tier: "Platinum",
    },
  ];
  const transactionsData = [
    {
      id: 1,
      type: "Purchase",
      customerName: "John Doe",
      amount: 250,
      points: 20,
    },
    {
      id: 2,
      type: "Refund",
      customerName: "Jane Smith",
      amount: -100,
      points: -10,
    },
    {
      id: 3,
      type: "Purchase",
      customerName: "Michael Johnson",
      amount: 500,
      points: 50,
    },
    {
      id: 4,
      type: "Purchase",
      customerName: "Emily Davis",
      amount: 75,
      points: 5,
    },
    {
      id: 5,
      type: "Refund",
      customerName: "Robert Brown",
      amount: -50,
      points: -5,
    },
  ];
  const offersData = [
    {
      id: 1,
      brandName: "Starbucks",
      description: "Get a free coffee",
      pointsRequired: 100,
      endDate: "30 Aug 2024",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
    },
    {
      id: 2,
      brandName: "Nike",
      description: "20% off on shoes",
      pointsRequired: 500,
      endDate: "15 Sep 2024",
      logo: "https://media.about.nike.com/image-downloads/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg",
    },
    {
      id: 3,
      brandName: "Amazon",
      description: "Gift card $10",
      pointsRequired: 1000,
      endDate: "10 Oct 2024",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzd0qx_OSOZZ_c_StuBYAxk8TDAlwdCLZmfw&s",
    },
    {
      id: 4,
      brandName: "Apple",
      description: "Apple Music Free Trial",
      pointsRequired: 300,
      endDate: "25 Aug 2024",
      logo: "https://cdn.prod.www.spiegel.de/images/9d73d9fb-0001-0004-0000-000001021121_w1024_r2.194_fpx57.92_fpy49.98.jpg",
    },
    {
      id: 5,
      brandName: "Uber",
      description: "Free ride up to $5",
      pointsRequired: 200,
      endDate: "5 Sep 2024",
      logo: "https://play-lh.googleusercontent.com/AQtSF5Sl18yp3mQ2tcbOrBLekb7cyP3kyg5BB1uUuc55zfcnbkCDLHFTBwZfYiu1aDI=s256-rw",
    },
  ];
  const pointsActivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Points Earned",
        data: [1200, 1900, 1500, 2100, 1800, 2500, 2200],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Points Redeemed",
        data: [800, 1200, 950, 1300, 1100, 1600, 1400],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const tierDistributionData = {
    labels: ["Silver", "Gold", "Platinum"],
    datasets: [
      {
        data: [300, 150, 50],
        backgroundColor: [
          "rgb(148, 163, 184)",
          "rgb(234, 179, 8)",
          "rgb(168, 85, 247)",
        ],
      },
    ],
  };
  const customerGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Customers",
        data: [65, 85, 110, 145, 180, 210],
        backgroundColor: "rgb(34, 197, 94)",
      },
    ],
  };
  const segmentAnalysisData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "VIP",
        data: [30, 45, 57, 75, 85, 95],
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        borderColor: "rgba(168, 85, 247, 1)",
        fill: true,
      },
      {
        label: "Regular",
        data: [120, 135, 155, 170, 185, 195],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
        fill: true,
      },
      {
        label: "At Risk",
        data: [25, 20, 15, 18, 12, 8],
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "rgba(239, 68, 68, 1)",
        fill: true,
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          {" "}
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Dashboard
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
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData?.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RecentCustomers customers={customersData} />
        <RecentActivity transactions={transactionsData} />
        <ActiveOfters offers={offersData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <PointsActivity pointsActivityData={pointsActivityData} />
        <TierDistribution tierDistributionData={tierDistributionData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CustomerGrowth customerGrowthData={customerGrowthData} />
        <SegmentAnalaysis segmentAnalysisData={segmentAnalysisData} />
      </div>
    </>
  );
};

export default Dashboard;
