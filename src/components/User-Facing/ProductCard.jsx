import { useState } from "react";

const ProductCard = ({ product, onClick }) => {
 const [expanded, setExpanded] = useState(false);
  const maxChars = 70;
  const description = product?.description?.en || "";

  const shouldTruncate = description.length > maxChars;
  const displayText = expanded || !shouldTruncate
    ? description
    : description.slice(0, maxChars) + "...";
  return (
    <div
      className="rounded-[8px] border border-[#E3E3E3] bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="w-full h-28 ">
          {" "}
          <img
            src={product?.posterImage || product?.image}
            alt="Brand Logo"
            className="w-full h-full object-cover rounded-t-[8px] "
          />
        </div>
      </div>
      <div className="mb-1 p-2 poppins-text">
        <span className="text-sm font-semibold leading-tight  line-clamp-1">
          {product?.title?.en}
        </span>

      <div className="flex items-center justify-between mt-2">
      <div className="text-xs text-[#4E4E4E]">
        {displayText}
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 ml-1  text-[10px]"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
      </div>
    </div>
  );
};

export default ProductCard;
