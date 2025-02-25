import StyledSearchInput from "../../ui/StyledSearchInput";
import StyledButton from "../../ui/StyledButton";
import PointsCard from "../../ui/point-managememt/PointsCard";
import { useState } from "react";
import {
  CheckIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  PencilIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import AddPointsCriteria from "../../components/points-management/AddPointsCriteria";
const PointsCriteria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const[addOpen,setAddOpen]= useState(false);
  const pointsCriteria = [
    {
      id: 1,
      name: "Recharge",
      description: "Points earned for mobile recharge transactions",
      type: "service",
      pointsFormula: "1:1 OMR",
      icon: "📱",
      integration: {
        method: "POST",
        endpoint: "/api/v1/services/recharge",
        sdkMethod: "khedmah.rechargeService()",
        parameters: {
          serviceProvider: "string (required) - Provider name",
          mobileNumber: "string (required) - Format: 968XXXXXXXX",
          amount: "number (required) - Amount in OMR",
          customerId: "string (required) - Customer ID",
        },
      },
    },
    {
      id: 2,
      name: "Telecom",
      description: "Points earned for telecom bill payments",
      type: "service",
      pointsFormula: "2:1 OMR",
      icon: "📞",
      integration: {
        method: "POST",
        endpoint: "/api/v1/services/telecom-payment",
        sdkMethod: "khedmah.payTelecomBill()",
        parameters: {
          provider: "string (required) - Telecom provider name",
          accountNumber: "string (required) - Customer account number",
          amount: "number (required) - Bill amount",
          billReference: "string (required) - Bill reference number",
        },
        example: {
          request: `{
        "provider": "Ooredoo",
        "accountNumber": "TEL987654",
        "amount": 45.500,
        "billReference": "BILL456",
        "customerId": "CUST123"
      }`,
          response: `{
        "success": true,
        "pointsEarned": 91,
        "transactionId": "TEL456",
        "billStatus": "paid",
        "receipt": {
          "number": "RCP789012",
          "amount": 45.500,
          "currency": "OMR",
          "timestamp": "2024-01-25T14:30:00Z"
        }
      }`,
        },
        notes: [
          "Points awarded after successful recharge",
          "Available for prepaid and postpaid numbers",
          "Minimum recharge amount may vary by provider",
        ],
      },
    },
    {
      id: 3,
      name: "Electricity",
      description: "Points earned for electricity bill payments",
      type: "utility",
      pointsFormula: "2:1 OMR",
      icon: "⚡",
      integration: {
        method: "POST",
        endpoint: "/api/v1/services/electricity-payment",
        sdkMethod: "khedmah.payElectricityBill()",
        parameters: {
          provider: "string (required) - Electricity provider name",
          accountNumber: "string (required) - Customer account number",
          amount: "number (required) - Bill amount",
          billReference: "string (required) - Bill reference number",
        },
        example: {
          request: `{
        "provider": "Muscat Electricity",
        "accountNumber": "ELEC123456",
        "amount": 75.000,
        "billReference": "BILL123",
        "customerId": "CUST123"
      }`,
          response: `{
        "success": true,
        "pointsEarned": 150,
        "transactionId": "ELEC456",
        "billStatus": "paid",
        "receipt": {
          "number": "RCP456789",
          "amount": 75.000,
          "currency": "OMR",
          "timestamp": "2024-01-25T15:45:00Z"
        }
      }`,
        },
        notes: [
          "Points awarded after successful recharge",
          "Available for prepaid and postpaid numbers",
          "Minimum recharge amount may vary by provider",
        ],
      },
    },
  ];
  const selectedCriteria = pointsCriteria[0];
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
          <h1 className="text-2xl font-semibold text-gray-900">
            Points Criteria
          </h1>
          <div className="flex items-center gap-4">
            <StyledSearchInput placeholder={"Search by name"} />
            <StyledButton onClick={() => setAddOpen(true)}
              name={
                <>
                  <span className="text-lg leading-none">+</span>
                  Add Points Criteria
                </>
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pointsCriteria.map((criteria) => (
            <PointsCard
              onClick={() => setIsModalOpen(true)}
              key={criteria.id}
              criteria={criteria}
            />
          ))}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl min-h-[500px] max-h-[80vh] overflow-y-auto p-6 mt-17">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition pb-2"
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
        <AddPointsCriteria isOpen={addOpen} onClose={() => setAddOpen(false)} onSuccess={() => setAddOpen(false)} />
      </div>
    </>
  );
};

export default PointsCriteria;
