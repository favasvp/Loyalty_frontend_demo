import { ArrowRightIcon } from "@heroicons/react/24/solid";

const OfferCard = ({ data }) => {
  const { title,merchantId, description, posterImage, discountDetails } = data;
  return (
    <div
      className=" rounded-2xl border border-[#FFF3E1] bg-white p-4"
      style={{
        boxShadow: `
          0px 0.5px 1.5px 0px #0000001F,
          0px 0px 1px 0px #0000000A
        `,
      }}
    >
      <div className="flex justify-between items-center mb-2 ">
        <div className="border border-[#FFECD3] rounded-md p-1">
          {" "}
          <img src={posterImage} alt="Puma Logo" className="w-7 h-7 contain" />
        </div>
        <span className="text-gray-500 text-[8px]  tracking-wide mt-1 poppins-text">
          OFFER
        </span>
      </div>
      <div className="mb-1">
        <span className=" text-sm font-semibold leading-tight poppins-text line-clamp-1">
          {merchantId?.title?.en}
        </span>
        <span className="  text-[8px]  mt-1 leading-tight line-clamp-2">
          {description?.en}
        </span>
      </div>
      <hr className="my-3 border-[#FFF5E7]" />

      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-500 text-[8px] mb-1 poppins-text">
            For all members
          </div>
          <div className=" text-base font-semibold">
            {" "}
            {discountDetails?.type === "PERCENTAGE"
              ? `${discountDetails?.value}%`
              : `${discountDetails?.value}`}
          </div>
        </div>
        <button className="bg-[#4A4A4A] rounded-lg w-6 h-6 flex items-center justify-center">
          <ArrowRightIcon className="w-2 h-2 text-white" />
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
