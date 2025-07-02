import { useState } from "react";
import { useCustomerAuth } from "../../hooks/useCustomerAuth";
import UserCard from "../../components/User-Facing/UserCard";

const AuthDemo = () => {
  const {
    customerID,
    apiKey,
    isAuthenticated,
    customerData,
    setAuth,
    clearAuth,
  } = useCustomerAuth();

  const [demoCredentials, setDemoCredentials] = useState({
    customerID: "DEMO123",
    apiKey: "dev-api-key-2024",
  });

  const demoCustomers = [
    {
      customerID: "BRONZE123",
      apiKey: "dev-api-key-2024",
      name: "John Doe (Bronze)",
      tier: "Bronze",
    },
    {
      customerID: "SILVER456",
      apiKey: "dev-api-key-2024",
      name: "Sarah Smith (Silver)",
      tier: "Silver",
    },
    {
      customerID: "GOLD789",
      apiKey: "dev-api-key-2024",
      name: "Michael Johnson (Gold)",
      tier: "Gold",
    },
    {
      customerID: "PLATINUM999",
      apiKey: "dev-api-key-2024",
      name: "Emma Wilson (Platinum)",
      tier: "Platinum",
    },
  ];

  const handleSetAuth = () => {
    setAuth(demoCredentials.customerID, demoCredentials.apiKey);
  };

  const handleDemoLogin = (customer) => {
    setAuth(customer.customerID, customer.apiKey);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Customer Authentication Demo
        </h1>

        {/* Current Authentication Status */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Authenticated:</span>
              <span
                className={`font-medium ${
                  isAuthenticated ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAuthenticated ? "Yes" : "No"}
              </span>
            </div>
            {isAuthenticated && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer ID:</span>
                  <span className="font-mono text-sm">{customerID}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">API Key:</span>
                  <span className="font-mono text-sm">{apiKey}</span>
                </div>
                {customerData && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Name:</span>
                    <span className="font-medium">{customerData.name}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Demo Login Options */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Demo Login Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {demoCustomers.map((customer) => (
              <button
                key={customer.customerID}
                onClick={() => handleDemoLogin(customer)}
                className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors"
              >
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-gray-600">
                  {customer.tier} Tier
                </div>
                <div className="text-xs text-gray-400 font-mono mt-1">
                  ID: {customer.customerID}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Credentials */}
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Custom Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer ID
                </label>
                <input
                  type="text"
                  value={demoCredentials.customerID}
                  onChange={(e) =>
                    setDemoCredentials((prev) => ({
                      ...prev,
                      customerID: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter customer ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="text"
                  value={demoCredentials.apiKey}
                  onChange={(e) =>
                    setDemoCredentials((prev) => ({
                      ...prev,
                      apiKey: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter API key"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSetAuth}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Set Authentication
              </button>
              <button
                onClick={clearAuth}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Clear Authentication
              </button>
            </div>
          </div>
        </div>

        {/* UserCard Demo */}
        {isAuthenticated && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">UserCard Component</h2>
            <div className="flex justify-center">
              <UserCard />
            </div>
          </div>
        )}

        {/* Navigation Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-blue-800">
            Navigation Testing Instructions
          </h2>
          <div className="space-y-2 text-blue-700">
            <p>1. Login using one of the demo options above</p>
            <p>
              2. Navigate to the user dashboard:{" "}
              <span className="font-mono bg-white px-2 py-1 rounded">
                /user/dashboard
              </span>
            </p>
            <p>3. Use the bottom navigation to switch between pages</p>
            <p>4. Notice that authentication persists across navigation</p>
            <p>
              5. The UserCard component will work on all pages without requiring
              URL parameters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;
