import { useEffect, useState } from "react";
import { useCustomerAuth } from "../hooks/useCustomerAuth";

export const AppMainButton = ({ loading, onClick, name }) => {
  const { customerID, apiKey, customerData } = useCustomerAuth();
  const [variant, setVariant] = useState(null);

  const variantStyles = {
    bronze: "bg-gradient-to-r from-[#FFFBEF] to-[#FFDFBE]",
    silver: "bg-gradient-to-r from-[#E4E4E4] to-[#7C818A]",
    gold: "bg-gradient-to-r from-[#FFFBEF] to-[#FFD983]",
  };

  const backgroundClass = variantStyles[variant] || variantStyles.bronze;

  useEffect(() => {
    const fetchCustomerData = () => {
      try {
        const tier = customerData?.customer_tier?.en;
        switch (tier) {
          case "Bronze":
            setVariant("bronze");
            break;
          case "Silver":
            setVariant("silver");
            break;
          case "Gold":
            setVariant("gold");
            break;
          default:
            setVariant("bronze"); // fallback
        }
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerID, apiKey, customerData]);

  return (
    <button
      disabled={loading}
      className={`w-full text-sm font-medium text-[#0F0F10] px-[10px] py-[20px] rounded-[10px] mt-4 mb-4 ${backgroundClass}`}
      onClick={onClick}
    >
      {loading ? "Loading..." : name}
    </button>
  );
};
