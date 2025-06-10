import { useState } from "react";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const OffersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(new Set());

  const categories = ["All", "Fashion", "Food", "Electronics", "Life"];

  const [offers] = useState([
    {
      id: 1,
      title: "Footwears",
      discount: "Get 30% off on your first purchase",
      originalPrice: "₹2,999",
      discountedPrice: "₹2,099",
      image: null,
      category: "Fashion",
      brand: "Nike",
    },
    {
      id: 2,
      title: "Footwears",
      discount: "Get 25% off on your first purchase",
      originalPrice: "₹3,499",
      discountedPrice: "₹2,624",
      image: null,
      category: "Fashion",
      brand: "Adidas",
    },
    {
      id: 3,
      title: "Footwears",
      discount: "Get 15% off on your first purchase",
      originalPrice: "₹1,999",
      discountedPrice: "₹1,699",
      image: null,
      category: "Fashion",
      brand: "Puma",
    },
    {
      id: 4,
      title: "Footwears",
      discount: "Get 20% off on your first purchase",
      originalPrice: "₹4,999",
      discountedPrice: "₹3,999",
      image: null,
      category: "Fashion",
      brand: "Jordan",
    },
    {
      id: 5,
      title: "Footwears",
      discount: "Get 35% off on your first purchase",
      originalPrice: "₹2,499",
      discountedPrice: "₹1,624",
      image: null,
      category: "Fashion",
      brand: "Reebok",
    },
    {
      id: 6,
      title: "Footwears",
      discount: "Get 40% off on your first purchase",
      originalPrice: "₹1,799",
      discountedPrice: "₹1,079",
      image: null,
      category: "Fashion",
      brand: "Converse",
    },
  ]);

  const filteredOffers = offers.filter((offer) => {
    const matchesCategory =
      selectedCategory === "All" || offer.category === selectedCategory;
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (offerId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(offerId)) {
      newFavorites.delete(offerId);
    } else {
      newFavorites.add(offerId);
    }
    setFavorites(newFavorites);
  };

  const getDiscountPercentage = (original, discounted) => {
    const originalNum = parseInt(original.replace(/[₹,]/g, ""));
    const discountedNum = parseInt(discounted.replace(/[₹,]/g, ""));
    return Math.round(((originalNum - discountedNum) / originalNum) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <button className="p-2 hover:bg-orange-600 rounded-full">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Offers</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 bg-white shadow-sm">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Offers Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative">
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">👟</span>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {getDiscountPercentage(
                    offer.originalPrice,
                    offer.discountedPrice
                  )}
                  % OFF
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(offer.id)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
                >
                  {favorites.has(offer.id) ? (
                    <HeartSolidIcon className="w-4 h-4 text-red-500" />
                  ) : (
                    <HeartIcon className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-800 text-sm mb-1">
                  {offer.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{offer.discount}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-gray-800">
                      {offer.discountedPrice}
                    </span>
                    <span className="text-xs text-gray-500 line-through ml-1">
                      {offer.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Brand */}
                <p className="text-xs text-orange-500 font-medium mt-1">
                  {offer.brand}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No offers found</p>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Load More Offers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
