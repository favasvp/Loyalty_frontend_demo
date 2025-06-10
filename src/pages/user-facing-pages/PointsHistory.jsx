import { useState } from "react";
import {
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

const PointsHistory = () => {
  const [user] = useState({
    name: "ABDUL WAHAAB",
    totalPoints: 50000,
  });

  const [transactions] = useState([
    {
      id: 1,
      type: "earned",
      points: 250,
      description: "App download",
      date: "01-01-2023",
      balance: "2,100.00",
    },
    {
      id: 2,
      type: "burned",
      points: 50,
      description: "Voucher purchase",
      date: "01-01-2023",
      balance: "2,050.00",
    },
    {
      id: 3,
      type: "earned",
      points: 100,
      description: "App download",
      date: "01-01-2023",
      balance: "2,150.00",
    },
    {
      id: 4,
      type: "earned",
      points: 75,
      description: "App download",
      date: "01-01-2023",
      balance: "2,225.00",
    },
    {
      id: 5,
      type: "burned",
      points: 25,
      description: "Voucher purchase",
      date: "01-01-2023",
      balance: "2,200.00",
    },
    {
      id: 6,
      type: "earned",
      points: 200,
      description: "App download",
      date: "01-01-2023",
      balance: "2,400.00",
    },
    {
      id: 7,
      type: "earned",
      points: 150,
      description: "App download",
      date: "01-01-2023",
      balance: "2,550.00",
    },
    {
      id: 8,
      type: "burned",
      points: 100,
      description: "Voucher purchase",
      date: "01-01-2023",
      balance: "2,450.00",
    },
  ]);

  const getTransactionIcon = (type) => {
    if (type === "earned") {
      return <PlusIcon className="w-4 h-4" />;
    }
    return <MinusIcon className="w-4 h-4" />;
  };

  const getTransactionColor = (type) => {
    if (type === "earned") {
      return "text-green-600 bg-green-100";
    }
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <button className="p-2 hover:bg-orange-600 rounded-full">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Points History</h1>
        </div>

        {/* Total Points Card */}
        <div className="bg-white rounded-lg p-4 text-center">
          <h2 className="text-sm text-gray-600 mb-1">{user.name}</h2>
          <div className="text-3xl font-bold text-green-600 mb-1">
            {user.totalPoints.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600">Total Point Balance</p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-4">
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-lg p-4 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getTransactionColor(
                      transaction.type
                    )}`}
                  >
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 capitalize">
                      Points {transaction.type}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {transaction.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-semibold ${
                      transaction.type === "earned"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "earned" ? "+" : "-"}
                    {transaction.points} pts
                  </div>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Balance:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {transaction.balance} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-6 text-center">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
            Load More Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PointsHistory;
