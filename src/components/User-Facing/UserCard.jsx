import khedmah from "../../assets/Frame 92.png";
import bronze from "../../assets/bronze.png";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const UserCard = () => {
  const user = {
    name: "Abdul Wahaab",
    membership: "Bronze",
    points: 1200,
    nextTierPoints: 5000,
    avatar: null,
  };

  const pointsToGold = user.nextTierPoints - user.points;
  const progressPercent = (user.points / user.nextTierPoints) * 100;
  const formatPoints = (num) => num.toLocaleString("de-DE");

  return (
    <div className="bg-white rounded-2xl max-w-md mx-auto overflow-hidden ">
      <div className="flex justify-between items-start px-4 py-4">
        <div>
          <h2 className="text-[#737373] text-sm font-semibold poppins-text mb-1">
            Welcome
          </h2>
          <h1 className="text-[#4A4A4A] text-base font-semibold poppins-text">
            {user.name} !
          </h1>
        </div>
        <img
          src={khedmah}
          alt="Khedmah Logo"
          className="w-11 h-11 rounded-lg"
        />
      </div>

      <div className="relative flex items-center px-4 mb-2">
        <img
          src={bronze}
          alt="Bronze Badge"
          className="absolute left-[-12px] top-1/3 -translate-y-1/2 w-29 h-29 z-0 "
          style={{ pointerEvents: "none" }}
        />
        <div className="relative z-10 pl-20 flex flex-col">
          <span className="text-[#2F2F2F] font-semibold text-xl leading-none poppins-text">
            {user.membership}
          </span>
          <div className="flex items-center mt-1 text-[#828282] text-xs">
            <span className="poppins-text">{formatPoints(user.points)}</span>
            <span className=" ml-1 poppins-text">Points</span>
            <ChevronRightIcon className="w-4 h-4  ml-1" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-[#E39C75] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span className="text-[#8E8E8E] text-[12px] poppins-text">
          {formatPoints(pointsToGold)} Points to Gold
        </span>
      </div>
    </div>
  );
};

export default UserCard;
