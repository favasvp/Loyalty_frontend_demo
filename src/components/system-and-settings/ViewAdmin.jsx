import { ShieldCheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import StyledButton from "../../ui/StyledButton";

const ViewAdmin = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const userRole = {
    name: "Administrator",
    description: "Has full access to all management features.",
    permissions: [
      "roleManagement_modify",
      "adminManagement_view",
      "eventManagement_modify",
      "collegeManagement_view",
      "newsManagement_modify",
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 mt-10 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-xl p-6  max-h-[90vh] overflow-y-auto">
        <div className="bg-white rounded-lg w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">User Role</h2>
              <p className="mt-1 text-sm text-gray-500">Role information</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span className="font-medium">{userRole.name}</span>
                </div>
              </div>
            </div>

            {userRole && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-gray-600">
                    {userRole.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Access Level
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userRole.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmin;
