import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ProductCard from "../../components/User-Facing/ProductCard";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../../hooks/useCustomerAuth";
import sdkApi from "../../api/sdk";
import InfiniteScroll from "react-infinite-scroll-component";
const UserBrands = () => {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const { customerID, apiKey, customerData } = useCustomerAuth();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const brandData = await sdkApi.getBrands(customerID, apiKey, {
        page,
        limit: rows,
      });
      const newBrands = brandData.data || [];
      setBrands((prev) => [...prev, ...newBrands]);
      if (newBrands.length < rows) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
      setHasMore(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [customerID, apiKey, customerData, page, rows]);
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="flex justify-between items-center p-4 ">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-6 h-6 " />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-[#404040] poppins-text">
              Brands
            </h1>
          </div>
        </div>
      </div>{" "}
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
        dataLength={brands.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={""}
      >
        <div className="grid grid-cols-2 gap-3 px-4 py-4">
          {brands?.length === 0 && (
            <div className="col-span-2 text-center text-gray-500">
              No brands found
            </div>
          )}
          {brands?.map((brand, index) => {
            return <ProductCard key={index} product={brand} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UserBrands;
