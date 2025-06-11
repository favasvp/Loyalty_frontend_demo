import background from "../../assets/background.png";

import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import { pointsHistoryData } from "../../assets/json/userData";


const PointsHistory = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <div
          className=" h-52 flex items-center justify-center"
          style={{
            backgroundImage: `url(${background})`,
            // backgroundSize: "object-cover",
          }}
        >
          <div className="p-4 poppins-text items-center bg-white rounded-2xl space-y-2">
            <h2 className="text-xl font-semibold text-[#3E3D40]">
              ABDUL WAHAAB
            </h2>
            <h1 className="text-[#0FB55D] text-3xl font-semibold">50,000</h1>
            <h3 className="text-[#6B7276] text-sm font-medium">
              Total Point Balance
            </h3>
          </div>
        </div>
        <div className="w-full bg-white top-38 absolute rounded-t-3xl p-4 mt-10">
          {pointsHistoryData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center mb-2 border-b border-b-[#F8F8F8] p-3 "
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 
                  ${item.type === "earned" ? "bg-[#E5FFF1]" : "bg-[#FFE7E7]"}`}
              >
                {item.type === "earned" ? (
                  <img src={plus} alt="plus" className="w-5 h-7 " />
                ) : (
                  <img src={minus} alt="minus" className="w-6 h-6 " />
                )}
              </div>
              <div className="flex-1 poppins-text">
                <div className="font-medium text-[#1E2022] text-sm mb-2">
                  {item.title}
                </div>
                <div className=" text-xs opacity-40">{item.description}</div>
              </div>
              <div
                className={`font-medium text-xs poppins-text ${
                  item.type === "earned" ? "text-[#00BC06]" : "text-[#ED4747]"
                }`}
              >
                {item.type === "earned" ? "+" : "+"}
                {item.points} <span className="text-xs">pts</span>
                <div className="text-[#000] opacity-40 text-xs mt-1">
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsHistory;
