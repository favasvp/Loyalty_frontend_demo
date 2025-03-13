import React from "react";
import { useAudits } from "../../hooks/useAudit";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ViewLog = ({ open, onClose, id }) => {
  const { useGetLogById } = useAudits();
  const { data: logs } = useGetLogById(id);

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/10">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl min-h-[500px] max-h-[60vh] overflow-y-auto p-6 mt-17 custom-scrollbar">
        {" "}
        <div className="absolute right-4 top-4 z-10">
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full bg-white/90 text-gray-500 hover:text-gray-900 transition shadow-sm"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLog;
