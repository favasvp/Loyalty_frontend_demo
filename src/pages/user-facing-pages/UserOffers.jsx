import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ProductCard from "../../components/User-Facing/ProductCard";
import { categories } from "../../assets/json/userData";
import { useNavigate } from "react-router-dom";
const UserOffers = () => {
  const [activeCategory, setActiveCategory] = useState("Fashion");
const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="flex justify-between items-center p-4 ">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-6 h-6 " />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-[#404040] poppins-text">
              Offers
            </h1>
          </div>
        </div>
      </div>{" "}
      <div className="px-4 mb-4 mt-3">
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.name)}
              className={`px-4 py-2 rounded-[10px] whitespace-nowrap text-sm font-medium transition-all duration-200 poppins-text ${
                activeCategory === category?.name
                  ? "bg-[#404040] text-white"
                  : "border border-[#404040] hover:bg-gray-200 text-[#404040]"
              }`}
            >
              {category?.name}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFE5C9] focus:border-transparent"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        {[...Array(10)].map((_, index) => (
          <ProductCard 
          onClick={() => navigate(`/user/coupon/${index}`)}
            key={index}
            product={{
              image:
                "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/306422/03/sv01/fnd/IND/fmt/png/Scuderia-Ferrari-Drift-Cat-5-Ultra-II-Sneakers", // Example Puma logo
              name: "Footwears",
              description: "Get 50% off on your first purchase ",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UserOffers;
