import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const StyledSearchInput = ({ placeholder, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="pl-10 pr-4 py-2.5 w-64 border bg-white border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default StyledSearchInput;
