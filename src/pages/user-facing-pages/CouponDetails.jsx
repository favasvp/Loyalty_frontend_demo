import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import image from "../../assets/image (5).png";
import { useNavigate } from "react-router-dom";
import RedeemCard from "../../components/User-Facing/RedeemCard";
import { useState } from "react";

const CouponDetails = () => {
  const navigate = useNavigate();
  const [showRedeemCard, setShowRedeemCard] = useState(false);
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-6">
      <div className="relative bg-[#23243A]  pb-4">
        <button
          className="absolute top-14 left-4 bg-gray-400 w-8 h-8 bg-opacity-50 rounded-full p-1 flex items-center justify-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-3 h-3 text-white" />
        </button>
        <img
          src={image}
          alt="Sneaker"
          className="w-full h-75 contain rounded-lg "
        />
      </div>

      <div className="px-5 pt-5 text-[#2C2C2C] poppins-text">
        <div className="flex items-center mb-2">
          <img
            src="https://pngimg.com/d/amazon_PNG17.png"
            alt="Amazon"
            className="w-6 h-6 mr-2"
          />
          <span className="font-semibold text-lg ">Amazon</span>
        </div>
        <div className="font-medium text-xl mb-1 ">FLAT RO 5 OFF</div>
        <div className="text-sm font-medium mb-4">
          On all purchases of electronics above RO 5.
        </div>

        <div>
          <div className="font-semibold text-base mb-2">Details</div>
          <ul className="text-xs list-disc pl-5 space-y-2">
            <li>Expires on: March 31, 2025</li>
            <li>
              Upgrade your gadgets with an instant discount on top electronics.
              Designed for tech enthusiasts!
            </li>
            <li>
              Eligibility: Offer valid for all users. Available only on online
              purchases.
            </li>
            <li>
              Refund Policy: Refunds are processed within 7-10 business days for
              eligible returns.
            </li>
            <li>Support: For queries, contact us at or call.</li>
          </ul>
        </div>
        <button
          onClick={() => setShowRedeemCard(true)}
          className=" w-full text-sm font-medium text-[#0F0F10] bg-gradient-to-r from-[#FFFBEF] to-[#FFDFBE] px-[10px] py-[20px] rounded-[10px] mt-4 mb-4"
        >
          Redeem Coupon
        </button>
      </div>
      {showRedeemCard && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 transition-opacity flex items-center justify-center">
          <div className="w-[86%] max-w-md rounded-2xl ">
            <RedeemCard onClose={() => setShowRedeemCard(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponDetails;
