import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ProductCard from "../../components/User-Facing/ProductCard";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../../hooks/useCustomerAuth";
import sdkApi from "../../api/sdk";

const UserBrands = () => {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(100);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const { customerID, apiKey, customerData } = useCustomerAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const brandData = await sdkApi.getBrands(customerID, apiKey, {
        page,
        limit: rows,
      });
      const newBrands = brandData.data || [];
      setBrands((prev) => [...prev, ...newBrands]);
      if (newBrands.length < rows) {
        // No more data
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (customerID && apiKey) {
      fetchData();
    }
  }, [customerID, apiKey]);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#404040]"></div>
    </div>
  );

  const NoBrandsFound = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 col-span-2">
      <div className="text-6xl text-gray-300 mb-4">🏢</div>
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        No brands found
      </h3>
      <p className="text-sm text-gray-500 text-center">
        Check back later for new brands and exciting offers.
      </p>
    </div>
  );

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

      <div className="min-h-[400px]">
        {initialLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 gap-3 px-4 py-4">
            {brands?.length === 0 ? (
              <NoBrandsFound />
            ) : (
              brands?.map((brand, index) => {
                return <ProductCard key={index} product={brand} />;
              })
            )}
          </div>
        )}
        {loading && !initialLoading && (
          <div className="px-4 pb-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBrands;
