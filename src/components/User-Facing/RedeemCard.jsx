import { useState } from "react";
import image from "../../assets/image (5).png";

const RedeemCard = ({ onClose }) => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (index) => (e) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain");
    if (/^\d{4}$/.test(pasted)) {
      setCode(pasted.split("").slice(0, 4));
      document.getElementById("code-3")?.focus();
    }
  };

  return (
    <div className="bg-white rounded-2xl pb-6">
      <div className="relative pb-4">
        <img
          src={image}
          alt="Sneaker"
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      </div>

      <div className="px-5 pt-5 text-[#2C2C2C] poppins-text">
        <h3 className="text-sm text-gray-500 font-medium">
          Enter Vendor Code:
        </h3>
        <div className="grid grid-cols-4 gap-3 px-4 py-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              onChange={handleChange(index)}
              onPaste={handlePaste}
              maxLength={1}
              inputMode="numeric"
              pattern="\d{1}"
              className="w-[48px] h-[58px] text-center text-lg font-semibold border border-[#FFD95E] rounded-[10px] bg-[#FFFBF5] focus:outline-none poppins-text"
            />
          ))}
        </div>
        <button
          className="w-full text-sm font-medium text-[#0F0F10] bg-gradient-to-r from-[#FFFBEF] to-[#FFDFBE] px-[10px] py-[20px] rounded-[10px] mt-4 mb-4"
          onClick={onClose}
        >
          Redeem Now
        </button>
      </div>
    </div>
  );
};

export default RedeemCard;
