import { Link } from "react-router-dom";

const ActiveOfters = ({ offers }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Active Offers</h3>
        <Link  className="text-sm text-green-600 hover:text-green-700">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {offers?.slice(0, 5).map((offer) => (
          <div key={offer.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <img src={offer.logo} alt={offer.brandName} className="w-8 h-8 rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">{offer.brandName}</p>
                <p className="text-xs text-gray-500">{offer.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">{offer.pointsRequired} points</p>
              <p className="text-xs text-gray-500">Expires {offer.endDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveOfters;
