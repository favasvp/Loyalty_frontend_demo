import { useState } from "react";
import { UserIcon, GiftIcon } from "@heroicons/react/24/outline";

const UserDashboard = () => {
  const [user] = useState({
    name: "Abdul Wahaab",
    membership: "Bronze",
    points: 50000,
    avatar: null,
  });

  const [coupons] = useState([
    {
      id: 1,
      title: "GIFT VOUCHER",
      subtitle: "10% discount on your next order",
      color: "bg-green-500",
    },
    {
      id: 2,
      title: "GIFT VOUCHER",
      subtitle: "Flat Entertainment Voucher worth ₹500",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "GIFT VOUCHER",
      subtitle: "Recharge with Khedmah: 3 times and get up to 5",
      color: "bg-orange-500",
    },
  ]);

  const [brands] = useState([
    { id: 1, name: "Levi's", logo: null },
    { id: 2, name: "ZARA", logo: null },
    { id: 3, name: "H&M", logo: null },
    { id: 4, name: "ROLEX", logo: null },
  ]);

  const [brandOffers] = useState([
    {
      id: 1,
      brand: "Puma Shoes",
      discount: "20%",
      originalPrice: "₹2,999",
      discountedPrice: "₹2,399",
    },
    {
      id: 2,
      brand: "Levi's Pants",
      discount: "20%",
      originalPrice: "₹1,999",
      discountedPrice: "₹1,599",
    },
  ]);

  const [categories] = useState([
    { id: 1, name: "Fashion", icon: "👔", color: "bg-yellow-100" },
    { id: 2, name: "Cosmetics", icon: "💄", color: "bg-pink-100" },
    { id: 3, name: "Electronics", icon: "📱", color: "bg-green-100" },
    { id: 4, name: "Footwear", icon: "👟", color: "bg-blue-100" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Welcome</p>
            <h1 className="text-lg font-semibold">{user.name} !</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Membership Status */}
        <div className="mt-4 bg-white rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {user.membership}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {user.points.toLocaleString()}
          </h2>
          <p className="text-sm text-gray-600">Total Point Balance</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Points Card Info */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">KEDMAH CLUB</h3>
              <p className="text-sm opacity-90">
                Earn points on every purchase
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {user.points.toLocaleString()}
              </p>
              <p className="text-xs opacity-90">Available Points</p>
            </div>
          </div>
        </div>

        {/* Coupons Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Coupons</h3>
            <button className="text-orange-500 text-sm font-medium">
              View all Coupons
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`${coupon.color} rounded-lg p-3 text-white text-center`}
              >
                <GiftIcon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-semibold">{coupon.title}</p>
                <p className="text-xs opacity-90 mt-1">{coupon.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brands Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Brands</h3>
            <button className="text-orange-500 text-sm font-medium">
              View all Brands
            </button>
          </div>

          <div className="flex space-x-4">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-lg p-3 shadow-sm border flex-1 text-center"
              >
                <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
                <p className="text-xs font-medium text-gray-800">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Offers Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Brand Offers
            </h3>
            <button className="text-orange-500 text-sm font-medium">
              View all Brand Offers
            </button>
          </div>

          <div className="space-y-3">
            {brandOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {offer.brand} - Sale
                    </p>
                    <p className="text-sm text-gray-600">
                      Save {offer.discount} on your purchase
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-500">
                    {offer.discount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <button className="text-orange-500 text-sm font-medium">
              View all Categories
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <div key={category.id} className="text-center">
                <div
                  className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-2`}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <p className="text-xs font-medium text-gray-800">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
