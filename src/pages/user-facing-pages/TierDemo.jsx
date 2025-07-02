import { useState } from "react";
import UserCard from "../../components/User-Facing/UserCard";

const TierDemo = () => {
  const [selectedTier, setSelectedTier] = useState("Bronze");

  // Mock customer data for different tiers
  const mockCustomers = {
    Bronze: {
      customerID: "BRONZE123",
      apiKey: "demo-api-key",
      data: {
        name: "John Doe",
        email: "john@example.com",
        mobile: "1234567890",
        point_balance: 2500,
        customer_tier: { en: "Bronze", ar: "برونز" },
      },
    },
    Silver: {
      customerID: "SILVER123",
      apiKey: "demo-api-key",
      data: {
        name: "Sarah Smith",
        email: "sarah@example.com",
        mobile: "1234567890",
        point_balance: 8500,
        customer_tier: { en: "Silver", ar: "فضة" },
      },
    },
    Gold: {
      customerID: "GOLD123",
      apiKey: "demo-api-key",
      data: {
        name: "Michael Johnson",
        email: "michael@example.com",
        mobile: "1234567890",
        point_balance: 25000,
        customer_tier: { en: "Gold", ar: "ذهب" },
      },
    },
    Platinum: {
      customerID: "PLATINUM123",
      apiKey: "demo-api-key",
      data: {
        name: "Emma Wilson",
        email: "emma@example.com",
        mobile: "1234567890",
        point_balance: 75000,
        customer_tier: { en: "Platinum", ar: "بلاتين" },
      },
    },
  };

  const tierColors = {
    Bronze: "bg-orange-500",
    Silver: "bg-gray-400",
    Gold: "bg-yellow-500",
    Platinum: "bg-slate-400",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Loyalty Tier Themes Demo
        </h1>

        {/* Tier Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-sm">
            {Object.keys(mockCustomers).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedTier === tier
                    ? `${tierColors[tier]} text-white shadow-md`
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tier Demo */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedTier} Tier Preview
          </h2>
          <div className="flex justify-center">
            {/* Mock UserCard with selected tier data */}
            <div className="w-80">
              <UserCardMock customerData={mockCustomers[selectedTier]} />
            </div>
          </div>
        </div>

        {/* All Tiers Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
            All Tiers Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(mockCustomers).map(([tier, data]) => (
              <div key={tier} className="text-center">
                <h3 className="font-medium text-gray-700 mb-3">{tier}</h3>
                <UserCardMock customerData={data} />
              </div>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Tier Theme Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                Visual Elements
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tier-specific color schemes</li>
                <li>• Dynamic progress bar colors</li>
                <li>• Custom badge styling</li>
                <li>• Gradient backgrounds</li>
                <li>• Shadow and border effects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Functionality</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time tier detection</li>
                <li>• Progress calculation</li>
                <li>• Points to next tier</li>
                <li>• Maximum tier handling</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock UserCard component for demo
const UserCardMock = ({ customerData }) => {
  // This simulates the UserCard component with mock data
  // In a real implementation, you'd mock the API call
  return (
    <div className="text-xs">
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <div style="font-family: 'Poppins', sans-serif;">
              <strong>${customerData.data.customer_tier.en}</strong><br/>
              ${customerData.data.name}<br/>
              ${customerData.data.point_balance.toLocaleString()} Points
            </div>
          `,
        }}
      />
      <div className="mt-2 text-center">
        <div className="text-xs text-gray-500">
          Mock UserCard - Use real URL params for actual component
        </div>
      </div>
    </div>
  );
};

export default TierDemo;
