import {
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  StarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";

const CustomerView = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/5 z-50">
      <div className="bg-white rounded-md shadow-sm w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Minimal header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">{data.name}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto flex-grow p-5">
          {/* Customer info */}
          <div className="mb-6 flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-sm font-medium">
              {data.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <div className="ml-4">
              <div className="text-xs text-gray-500 mb-1">ID: {data.customer_id}</div>
              {data.tier?.name && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  {data.tier.name}
                </span>
              )}
            </div>
            <div className="ml-auto flex items-center">
              <div className="flex items-center mr-4">
                <StarIcon className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-700">{data.total_points || 0}</span>
              </div>
              <div className="text-xs text-gray-500">
                Last active: {moment(data.last_active).fromNow()}
              </div>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact info */}
            <div className="md:col-span-1">
              <h3 className="text-xs uppercase text-gray-400 mb-3">Contact</h3>
              
              <div className="space-y-3">
                <a 
                  href={`mailto:${data.email}`}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2" />
                  {data.email}
                </a>
                
                <a 
                  href={`tel:${data.phone}`}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                  {data.phone}
                </a>
                
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Member since {moment(data.createdAt).format("MMM D, YYYY")}</span>
                </div>
              </div>
              
              {/* Membership info */}
              {data.tier?.description && (
                <div className="mt-6">
                  <h3 className="text-xs uppercase text-gray-400 mb-3">Membership</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {data.tier.description.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Applications */}
            <div className="md:col-span-2">
              <h3 className="text-xs uppercase text-gray-400 mb-3">Applications</h3>
              
              {data.app_type && data.app_type.length > 0 ? (
                <div className="space-y-4">
                  {data.app_type.map((app) => (
                    <div
                      key={app._id}
                      className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center">
                        <CreditCardIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-700">{app.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{app.description}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        Last used: {moment().subtract(Math.floor(Math.random() * 30), "days").fromNow()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 py-4">
                  No applications registered
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;