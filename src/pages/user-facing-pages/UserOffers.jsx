import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCustomerAuth } from "../../hooks/useCustomerAuth";
import sdkApi from "../../api/sdk";
import InfiniteScroll from "react-infinite-scroll-component";
import OfferView from "../../components/User-Facing/OfferView";

const UserOffers = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [offerData, setOfferData] = useState([]);
  const [page, setPage] = useState(1);
  const [rows] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);

  const { customerID, apiKey } = useCustomerAuth();
  const navigate = useNavigate();

  const fetchOfferData = async () => {
    try {
      const offers = await sdkApi.getMerchantOffers(customerID, apiKey, {
        categoryId: activeCategory,
        page,
        limit: rows,
      });

      const newOffers = offers.data || [];

      setOfferData((prev) => [...prev, ...newOffers]);
      if (newOffers.length < rows) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      setHasMore(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await sdkApi.getCategories(customerID, apiKey);
      const allCategory = { _id: "", title: { en: "All" } };
      setCategories([allCategory, ...categoriesData.data]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  useEffect(() => {
    if (customerID && apiKey) {
      fetchCategories();
    }
  }, [customerID, apiKey]);

  useEffect(() => {
    setOfferData([]);
    setPage(1);
    setHasMore(true);
  }, [activeCategory]);

  useEffect(() => {
    if (customerID && apiKey && page === 1 && offerData.length === 0) {
      fetchOfferData();
    }
  }, [customerID, apiKey, activeCategory, page]);
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
          {categories?.map((category) => (
            <button
              key={category?._id}
              onClick={() => setActiveCategory(category?._id)}
              className={`px-4 py-2 rounded-[10px] whitespace-nowrap text-sm font-medium transition-all duration-200 poppins-text ${
                activeCategory === category?._id
                  ? "bg-[#404040] text-white"
                  : "border border-[#404040] hover:bg-gray-200 text-[#404040]"
              }`}
            >
              {category?.title?.en}
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
      <InfiniteScroll
        dataLength={offerData.length}
        next={fetchOfferData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={""}
      >
        <div className="grid grid-cols-1 gap-3 px-0 py-4">
          {offerData?.length === 0 && (
            <div className="col-span-2 text-center text-gray-500">
              No offers found
            </div>
          )}
          {offerData?.map((offer, index) => {
            const params = new URLSearchParams(searchParams);
            params.set("couponId", offer?._id);
            const couponUrl = `/user/coupon?${params.toString()}`;

            return (
              <div key={index}>
                <OfferView
                  onClick={() => navigate(couponUrl)}
                  product={offer}
                />
                {index !== offerData.length - 1 && (
                  <div
                    className="my-2"
                    style={{
                      borderBottom: "0.6px solid rgba(0, 0, 0, 0.15)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UserOffers;