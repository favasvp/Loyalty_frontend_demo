import { useState } from "react";
import {
  ArrowLeftIcon,
  ClockIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const CouponDetails = () => {
  const [coupon] = useState({
    id: 1,
    title: "Amazon",
    subtitle: "FLAT RO 5 OFF",
    description: "On all purchases of electronics above RO 5",
    validUntil: "March 30, 2019",
    terms: [
      "Upgrade your gadgets with an instant discount on top electronics designed for tech enthusiasts.",
      "Offer valid for 30 days.",
      "Available for any purchases online or in-store.",
      "Cannot be combined with other offers or gift cards.",
      "Refund Policy: Refunds are processed within 7-10 business days to original return method.",
      "Payment by credit/s, debit card, or cash on delivery according to online shopping policy or offline.",
    ],
    howToRedeem: [
      "Visit the store or website",
      "Select your desired items",
      "Apply this coupon code at checkout",
      "Enjoy your discount!",
    ],
    code: "AMAZON5OFF",
    bgColor: "bg-gradient-to-r from-blue-600 to-blue-800",
    logo: "amazon",
  });

  const [isRedeemed, setIsRedeemed] = useState(false);

  const handleRedeem = () => {
    setIsRedeemed(true);
    // Here you would typically make an API call to redeem the coupon
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-6 text-white">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-orange-600 rounded-full">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Coupon Collected</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Coupon Card */}
        <div
          className={`${coupon.bgColor} rounded-lg p-6 text-white relative overflow-hidden`}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">a</span>
                </div>
                <span className="text-lg font-semibold">{coupon.title}</span>
              </div>
              <div className="text-right">
                {isRedeemed && (
                  <CheckCircleIcon className="w-6 h-6 text-green-400" />
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">{coupon.subtitle}</h2>
            <p className="text-blue-100 mb-4">{coupon.description}</p>

            <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium">Coupon Code</p>
              <p className="text-lg font-bold tracking-wider">{coupon.code}</p>
            </div>

            <div className="flex items-center space-x-2 text-blue-100">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">Valid until {coupon.validUntil}</span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Details</h3>
          <p className="text-gray-600 leading-relaxed">
            {coupon.description}. {coupon.terms[0]}
          </p>
        </div>

        {/* How to Redeem */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            How to Redeem
          </h3>
          <ol className="space-y-2">
            {coupon.howToRedeem.map((step, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2 mb-3">
            <InformationCircleIcon className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Terms & Conditions
            </h3>
          </div>
          <ul className="space-y-2">
            {coupon.terms.map((term, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-orange-500 mt-2 flex-shrink-0">•</span>
                <span className="text-gray-600 text-sm">{term}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Redeem Button */}
        <div className="sticky bottom-4">
          <button
            onClick={handleRedeem}
            disabled={isRedeemed}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
              isRedeemed
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {isRedeemed ? (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Coupon Redeemed</span>
              </div>
            ) : (
              "Redeem Coupon"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponDetails;
