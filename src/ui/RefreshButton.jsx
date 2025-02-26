import { ArrowPathIcon } from "@heroicons/react/24/outline";

const RefreshButton = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`p-2 rounded-lg border border-gray-300 hover:bg-gray-50 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <ArrowPathIcon className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
    </button>
    
  );
};

export default RefreshButton;
