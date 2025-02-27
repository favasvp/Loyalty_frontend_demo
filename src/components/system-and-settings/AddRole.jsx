import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

const rolesList = [
  "roleManagement_modify",
  "roleManagement_view",
  "adminManagement_modify",
  "adminManagement_view",
  "memberManagement_modify",
  "memberManagement_view",
  "eventManagement_modify",
  "eventManagement_view",
  "collegeManagement_modify",
  "collegeManagement_view",
  "newsManagement_modify",
  "newsManagement_view",
  "promotionManagement_modify",
  "promotionManagement_view",
];

const AddRole = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    roles: [],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      onSuccess(formData);
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to add role" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 mt-10 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6  max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Role</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Roles
              </label>
              <div className="grid grid-cols-3 gap-6 p-2">
                {rolesList?.map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.roles.includes(role)}
                      onChange={() => handleRoleChange(role)}
                    />
                    <span className="text-sm text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <StyledButton
                name="Cancel"
                onClick={onClose}
                variant="tertiary"
                disabled={isLoading}
              />
              <StyledButton
                name="Add Role"
                type="submit"
                variant="primary"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
