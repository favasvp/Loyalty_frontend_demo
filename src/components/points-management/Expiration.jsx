import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";
import {
  BellIcon,
  ChartBarIcon,
  ClockIcon,
  GiftIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import AddExpiration from "./AddExpiration";
import UpcomingExpiration from "./UpComingExpiration";
import { useExpirationRules } from "../../hooks/useExpirationRules";
import Loader from "../../ui/Loader";

const Expiration = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { useGetExpirationByApp } = useExpirationRules();
  const { isLoading, data: ruleData } = useGetExpirationByApp(id);
  const isRulesEmpty = !ruleData?.data || Object.keys(ruleData.data).length === 0;

  if (isLoading) {
    return (
   <Loader/>
    );
  }

  return (
    <div className="p-0">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Expiration Rules
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage point expiration policies 
        </p>
      </div>

      {isRulesEmpty ? (
        <div className="bg-white rounded-lg p-6 shadow-xs border border-gray-100 text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            No Expiration Rules Configured
          </h4>
          <p className="text-gray-500 mb-6">
            This app type does not have any expiration rules set up yet.
          </p>
          <StyledButton
            name="Add Expiration Rules"
            variant="primary"
            onClick={() => setOpen(true)}
            className="text-sm"
          />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg p-5 shadow-xs border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <ClockIcon className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-500">Default Expiry Period</p>
                  <p className="font-medium text-gray-800">
                    {ruleData?.data?.default_expiry_period}   days
                  </p>
                </div>
              </div>

              {/* <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <GiftIcon className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-500">Grace Period</p>
                  <p className="font-medium text-gray-800">
                    {ruleData?.data?.grace_period} days
                  </p>
                </div>
              </div> */}
            </div>

            <div className="mb-6">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <ChartBarIcon className="w-4 h-4 text-indigo-500" />
                Tier Extensions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ruleData?.data?.tier_extensions?.map(
                  ({ tier_id, additional_months }) => (
                    <div
                      key={tier_id?.name?.en}
                      className="flex items-center gap-2 bg-gray-50 p-3 rounded-md"
                    >
                      <div
                        className="flex-shrink-0 w-2 h-8 rounded-full"
                        style={{
                          backgroundColor: "#FFD700"
                             
                        }}
                      />
                      <div>
                        <p className="text-xs text-gray-500 capitalize">
                          {tier_id?.name?.en}
                        </p>
                        <p className="font-medium text-gray-800">
                          {additional_months} days
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* <div className="mb-6">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <BellIcon className="w-4 h-4 text-indigo-500" />
                Expiry Notifications
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ruleData?.data?.expiry_notifications &&
                  Object.entries(ruleData?.data?.expiry_notifications)?.map(
                    ([reminder, days], index) => (
                      <div
                        key={reminder}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-500 text-xs font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 capitalize">
                            {reminder.replace("Reminder", "")} Reminder
                          </p>
                          <p className="font-medium text-gray-800">
                            {days} days before
                          </p>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div> */}

            <div className="flex justify-end mt-6">
              <StyledButton
                name="Configure"
                variant="primary"
                onClick={() => setOpen(true)}
                className="text-sm"
              />
            </div>
          </div>

          {/* <div className="mt-6">
            <UpcomingExpiration />
          </div> */}
        </>
      )}

      <AddExpiration
        isOpen={open}
        onClose={() => setOpen(false)}
        editData={ruleData?.data}
        id={id}
      />
    </div>
  );
};

export default Expiration;