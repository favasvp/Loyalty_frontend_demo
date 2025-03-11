import StyledSearchInput from "../../ui/StyledSearchInput";
import StyledButton from "../../ui/StyledButton";
import PointsCard from "../../ui/point-managememt/PointsCard";
import { useState } from "react";
import {
  CheckIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import RefreshButton from "../../ui/RefreshButton";
import Loader from "../../ui/Loader";
import { usePointsCriteria } from "../../hooks/usePointsCriteria";
import AddPointCriteria from "../../components/points-management/AddPointCriteria";
const PointsCriteria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { useGetPointsCriteria,useGetPointsCriteriaById } = usePointsCriteria();
  const [Id, setId] = useState(null);
  const {
    data: pointsCriteriaData,
    isLoading,
    error,
    refetch,
    dataUpdatedAt,
  } = useGetPointsCriteria();
  const { data: selectedCriteria } = useGetPointsCriteriaById(Id?.id);



  const [isEditing, setIsEditing] = useState(false);
  const [editedFormula, setEditedFormula] = useState(
    selectedCriteria?.pointsFormula || ""
  );

  const handleSave = () => {
    setEditedFormula("4:1 OMR");
    setIsEditing(false);
  };
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            {" "}
            <h1 className="text-2xl font-semibold text-gray-900">
              Points Criteria
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {" "}
              Last Updated: {new Date(dataUpdatedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <RefreshButton onClick={() => refetch()} isLoading={isLoading} />
            <StyledSearchInput placeholder={"Search by name"} />
            <StyledButton
              onClick={() => setOpen(true)}
              name={
                <>
                  <span className="text-lg leading-none">+</span>
                  Add Points Criteria
                </>
              }
            />
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pointsCriteria.map((criteria) => (
              <PointsCard
                onClick={() => {
                  setId({ id });
                  setIsModalOpen(true);
                }}
                key={criteria.id}
                criteria={criteria}
              />
            ))}
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl min-h-[500px] max-h-[60vh] overflow-y-auto p-6 mt-17 custom-scrollbar">
              <div className="flex justify-end pb-9">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute  text-gray-600 hover:text-gray-900 transition cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 ">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                      <span className="text-2xl">{selectedCriteria?.icon}</span>
                      {selectedCriteria?.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedCriteria?.description}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {selectedCriteria?.type}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Points Formula
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedFormula}
                        onChange={(e) => setEditedFormula(e.target.value)}
                        className="mt-1 text-sm text-gray-600 bg-white border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-600">
                        {editedFormula}
                      </p>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Integration Details
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <CodeBracketIcon className="w-4 h-4" />
                        API Endpoint
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                          {selectedCriteria?.integration.method}
                        </span>
                        <code className="text-sm text-gray-600">
                          {selectedCriteria?.integration?.endpoint}
                        </code>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <DocumentTextIcon className="w-4 h-4" />
                        SDK Method
                      </div>
                      <code className="mt-2 block text-sm text-gray-600">
                        {selectedCriteria?.integration?.sdkMethod}
                      </code>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Parameters
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      {Object.entries(
                        selectedCriteria?.integration?.parameters
                      )?.map(([param, desc]) => (
                        <div key={param}>
                          <code className="text-sm font-medium text-purple-600">
                            {param}
                          </code>
                          <span className="text-sm text-gray-600 ml-2">
                            {desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedCriteria?.integration?.example && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Example
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Request
                          </div>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                            {selectedCriteria?.integration?.example?.request}
                          </pre>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Response
                          </div>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                            {selectedCriteria?.integration?.example?.response}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedCriteria?.integration?.notes && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Important Notes
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedCriteria?.integration?.notes?.map(
                          (note, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {note}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <AddPointCriteria isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default PointsCriteria;
