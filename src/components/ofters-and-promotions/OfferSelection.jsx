import React, { useState } from 'react';
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddOffer from './AddOffer';
const OfferSelection = ({ isOpen, onClose }) => {
  const [selectedOfferType, setSelectedOfferType] = useState(null);
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);

  const offerTypes = [
    { 
      id: 'dynamic', 
      title: 'Dynamic Offer', 
      description: 'Flexible offer with multiple configuration options' 
    },
    { 
      id: 'fixed', 
      title: 'Fixed Offer', 
      description: 'Simple, straightforward offer with basic parameters' 
    },
    { 
      id: 'points', 
      title: 'Points-Based Offer', 
      description: 'Offer redeemable with loyalty points' 
    }
  ];

  const handleOfferTypeSelect = (type) => {
    setSelectedOfferType(type);
    setIsAddOfferOpen(true);
  };

  const handleClose = () => {
    setSelectedOfferType(null);
    setIsAddOfferOpen(false);
    onClose();
  };

  if (!isOpen) return null;
  if (isAddOfferOpen) {
    return (
      <AddOffer 
        isOpen={true} 
        onClose={handleClose} 
        offerType={selectedOfferType} 
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Select Offer Type
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {offerTypes.map((type) => (
            <div 
              key={type.id}
              onClick={() => handleOfferTypeSelect(type.id)}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors group"
            >
              <h3 className="text-sm font-semibold text-gray-700 mb-2 group-hover:text-green-600">
                {type.title}
              </h3>
              <p className="text-xs text-gray-500 group-hover:text-green-500">
                {type.description}
              </p>
              <div className="mt-3 flex justify-end">
                <PlusIcon className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferSelection;