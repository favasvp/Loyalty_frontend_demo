import React, { useState } from "react";
import StyledButton from "../../ui/StyledButton";
import {
  BellIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClockIcon,
  GiftIcon,
  PaperClipIcon,
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
    <div>
      <h3 className="text-lg font-semibold mb-3">Expiration Rules</h3>
      <p className="text-sm text-gray-600 mb-4">
        Manage point expiration policies and grace periods.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-sm ">
        <p className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">Default Expiry Period:</span>{" "}
          {ex.defaultExpiryPeriod} months
        </p>
        <p className="flex items-center gap-2 text-sm">
          <GiftIcon className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">Grace Period:</span>{" "}
          {ex.gracePeriodDays} days
        </p>
      </div>
      <div className="mt-6">
        <p className="font-semibold mb-3 flex items-center gap-2 text-gray-900 text-sm">
          <ChartBarIcon className="w-4 h-4 text-gray-500" /> Tier Extensions:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {Object.entries(ex.tierExtensions).map(([tier, months]) => (
            <div
              key={tier}
              className="flex items-center gap-2 bg-white  px-4 py-3 rounded-lg shadow-xs"
            >
              <PaperClipIcon className="w-4 h-4 text-gray-500" />
              <span className="font-semibold capitalize">{tier}</span>: +
              {months} months
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 mb-6">
        <p className="font-semibold mb-3 flex items-center gap-2 text-gray-900 text-sm">
          <BellIcon className="w-4 h-4 text-gray-500" /> Expiry Notifications:
        </p>
        <ul className="list-disc pl-5 space-y-4 text-sm text-gray-800">
          <li className="flex items-center gap-2">
            <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
            First Reminder: {ex.notifications.firstReminder} days before expiry
          </li>
          <li className="flex items-center gap-2">
            <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
            Second Reminder: {ex.notifications.secondReminder} days before
            expiry
          </li>
          <li className="flex items-center gap-2">
            <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
            Final Reminder: {ex.notifications.finalReminder} days before expiry
          </li>
        </ul>
      </div>{" "}
      <div className="flex justify-end mt-6 mb-6">
        <StyledButton
          name={"Configure"}
          variant="primary"
          onClick={() => setOpen(true)}
        />
      </div>
      <UpcomingExpiration />
      <AddExpiration
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
      />
    </div>
  );
};

export default Expiration;
