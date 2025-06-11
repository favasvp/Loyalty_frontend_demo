import UserCard from "../../components/User-Facing/UserCard";
import bg from "../../assets/bg.png";
import CouponCard from "../../components/User-Facing/CouponCard";
import OfferCard from "../../components/User-Facing/OfferCard";
import background from "../../assets/background.png";
import { brands, categories, data, offers } from "../../assets/json/userData";
const DashboardUser = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <div
          className="rounded-b-2xl h-50"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="absolute left-1/2 top-10 -translate-x-1/2 w-full px-4">
          <UserCard />
        </div>
      </div>

      <div className=" bg-white  rounded-t-3xl p-4 mt-10">
        <img src={bg} />
        <div className="flex items-center justify-between mt-4 poppins-text mb-4">
          <h2 className="text-sm font-semibold ">Coupons</h2>
          <button className="text-xs font-medium text-[#0F0F10] bg-gradient-to-r from-[#FFFBEF] to-[#FFDFBE] px-[10px] py-[8px] rounded-[10px]">
            View All Coupons
          </button>
        </div>
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {data.map((item) => (
            <div className="min-w-[132px]">
              <CouponCard data={item} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 poppins-text mb-4">
          <h2 className="text-sm font-semibold ">Brands</h2>
          <button className="text-xs font-medium text-[#0F0F10] bg-gradient-to-r from-[#FFFBEF] to-[#FFDFBE] px-[10px] py-[8px] rounded-[10px]">
            View All Brands
          </button>
        </div>
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {brands.map((item) => (
            <div className="min-w-[70px]">
              <div className="w-full p-2 border border-[#FFE5C9] rounded-lg h-16 flex items-center">
                <img src={item.image} alt="" className="w-full h-6 object-contain" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 poppins-text mb-4">
          <h2 className="text-sm font-semibold ">Brand Offers</h2>
          <button className="text-xs font-medium text-[#0F0F10] bg-gradient-to-r from-[#FFFBEF] to-[#FFDFBE] px-[10px] py-[8px] rounded-[10px]">
            View All Brand Offers
          </button>
        </div>
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {offers.map((offer) => (
            <div className="min-w-[180px]">
              <OfferCard data={offer} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 poppins-text mb-4">
          <h2 className="text-sm font-semibold ">Categories </h2>
          <button className="text-xs font-medium text-[#0F0F10] bg-gradient-to-r from-[#FFFBEF] to-[#FFDFBE] px-[10px] py-[8px] rounded-[10px]">
            View All Categories
          </button>
        </div>
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {" "}
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
