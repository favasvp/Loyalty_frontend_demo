import UserCard from "../../components/User-Facing/UserCard";
import bg from "../../assets/bg.png";
import OfferCard from "../../components/User-Facing/OfferCard";
import bronze from "../../assets/background.png";
import { brands, categories, data, offers } from "../../assets/json/userData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import sdkApi from "../../api/sdk";
import { useCustomerAuth } from "../../hooks/useCustomerAuth";
import CouponCard from "../../components/User-Facing/CouponCard";
import silver from "../../assets/silver.png";
import gold from "../../assets/gold.png";
import AppButton from "../../ui/AppButton";
const DashboardUser = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const { customerID, apiKey } = useCustomerAuth();
  const [variant, setVariant] = useState("primary");
  const[offerData, setOfferData] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(bronze);
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await sdkApi.getCustomerDetails(customerID, apiKey);
        if (response.status === 200 && response.data) {
          const customerData = response.data;
          setCustomerData(customerData);
          const tier = customerData?.customer_tier?.en;
          switch (tier) {
            case "Bronze":
              setBackgroundImage(bronze);
              setVariant("bronze");
              break;
            case "Silver":
              setBackgroundImage(silver);
              setVariant("silver");
              break;
            case "Gold":
              setBackgroundImage(gold);
              setVariant("gold");
              break;
            default:
              setBackgroundImage(bronze);
          }
        }
        const offers = await sdkApi.getMerchantOffers(customerID, apiKey);
        setOfferData(offers.data);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerID, apiKey]);

 
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <div
          className="rounded-b-2xl h-50"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="absolute left-1/2 top-10 -translate-x-1/2 w-full px-4">
          <UserCard />
        </div>
      </div>

      <div className=" bg-white  rounded-t-3xl p-4 mt-10">
        <img src={bg} alt="Background decoration" />
        <div className="flex items-center justify-between mt-4 poppins-text mb-4">
          <h2 className="text-sm font-semibold ">Coupons</h2>

          <AppButton name={"View All Coupons"} variant={variant} />
        </div>
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {data.map((item) => (
            <div key={item.id} className="min-w-[132px]">
              <CouponCard data={item} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 poppins-text mb-4">
          <h2 className="text-sm font-semibold ">Brands</h2>
          <AppButton name={"View All Brands"} variant={variant} />
        </div>
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {brands.map((item) => (
            <div key={item.id} className="min-w-[70px]">
              <div className="w-full p-2 border border-[#FFE5C9] rounded-lg h-16 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-6 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 poppins-text mb-4">
          <h2 className="text-sm font-semibold ">Brand Offers</h2>
          <AppButton name={"View All Brand Offers"} variant={variant} />
        </div>
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {offerData.map((offer) => (
            <div key={offer.id} className="min-w-[180px]">
              <OfferCard data={offer} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 poppins-text mb-4">
          <h2 className="text-sm font-semibold ">Categories </h2>

          <AppButton name={"View All Categories"} variant={variant} />
        </div>
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center min-w-[89px]"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center mb-2">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-full h-full  object-cover"
                  onClick={() => navigate(`/category`)}
                />
              </div>
              <p className="text-sm text-center  poppins-text">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
