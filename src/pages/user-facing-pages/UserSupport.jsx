import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const UserSupport = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen ">
      <div className="flex justify-between items-center p-4 ">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-6 h-6 " />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-[#404040] poppins-text">
              Support
            </h1>
          </div>
        </div>
      </div>{" "}
      <div className="px-4 mb-4 mt-3">
        <h2 className="text-base font-medium  poppins-text">Issue</h2>
        <input
          type="text"
          className="w-full  rounded-[10px] py-3 px-4 mt-2 bg-[#F3F3F3] focus:outline-none poppins-text"
        />
        <h2 className="text-base font-medium  poppins-text mt-5">Details</h2>
        <textarea className="w-full  rounded-[10px] py-3 px-4 mt-2 bg-[#F3F3F3] focus:outline-none poppins-text" />
        <h2 className="text-base font-medium  poppins-text mt-5">
          Add Screenshot
        </h2>
        <input
          type="file"
          className="w-full  rounded-[10px] py-3 px-4 mt-2 bg-[#F3F3F3] focus:outline-none poppins-text"
        />
      </div>
      <div className="px-4 mb-4 mt-3">
        <button className=" w-full text-sm font-medium text-[#0F0F10] bg-gradient-to-r from-[#FFFBEF] to-[#FFDFBE] px-[10px] py-[20px] rounded-[10px] mt-4 mb-4">
          Send
        </button>
      </div>
    </div>
  );
};

export default UserSupport;
