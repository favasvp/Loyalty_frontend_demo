import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";
import {
  BellIcon,
  ChartBarIcon,
  ClockIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import AddExpiration from "./AddExpiration";
import UpcomingExpiration from "./UpComingExpiration";

const Expiration = () => {
  const [open, setOpen] = useState(false);
  const ex = {
    defaultExpiryPeriod: 12,
    tierExtensions: {
      silver: 0,
      gold: 3,
      platinum: 6,
    },
    notifications: {
      firstReminder: 30,
      secondReminder: 15,
      finalReminder: 7,
    },
    gracePeriodDays: 30,
  };

  return (
    <div className=" p-0 ">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Expiration Rules
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage point expiration policies and grace periods.
        </p>
      </div>

      <div className="bg-white rounded-lg p-5 shadow-xs border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            <ClockIcon className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-xs text-gray-500">Default Expiry Period</p>
              <p className="font-medium text-gray-800">
                {ex.defaultExpiryPeriod} months
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            <GiftIcon className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-xs text-gray-500">Grace Period</p>
              <p className="font-medium text-gray-800">
                {ex.gracePeriodDays} days
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <ChartBarIcon className="w-4 h-4 text-indigo-500" />
            Tier Extensions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(ex.tierExtensions).map(([tier, months]) => (
              <div
                key={tier}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"
              >
                <div
                  className="flex-shrink-0 w-2 h-8 rounded-full"
                  style={{
                    backgroundColor:
                      tier === "silver"
                        ? "#C0C0C0"
                        : tier === "gold"
                        ? "#FFD700"
                        : "#E5E4E2",
                  }}
                />
                <div>
                  <p className="text-xs text-gray-500 capitalize">{tier}</p>
                  <p className="font-medium text-gray-800">+{months} months</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <BellIcon className="w-4 h-4 text-indigo-500" />
            Expiry Notifications
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(ex.notifications).map(([reminder, days], index) => (
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
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <StyledButton
            name="Configure"
            variant="primary"
            onClick={() => setOpen(true)}
            className="text-sm"
          />
        </div>
      </div>

      <div className="mt-6">
        <UpcomingExpiration />
      </div>

      <AddExpiration
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
      />
    </div>
  );
};

export default Expiration;
