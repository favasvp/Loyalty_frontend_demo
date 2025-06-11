const ProductCard = ({ product, onClick }) => {
  const { image, name, description } = product;

  return (
    <div
      className="rounded-[8px] border border-[#E3E3E3] bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="w-full h-26 ">
          {" "}
          <img
            src={image}
            alt="Brand Logo"
            className="w-full h-full object-cover rounded-t-[8px] "
          />
        </div>
      </div>
      <div className="mb-1 p-2 poppins-text">
        <span className="text-sm font-semibold leading-tight  line-clamp-1">
          {name}
        </span>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-[#4E4E4E]">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
