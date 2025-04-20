import {
  AdjustmentsHorizontalIcon,
  ArrowLeftCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowPathIcon,
  BuildingStorefrontIcon,
  CalendarDateRangeIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  DocumentChartBarIcon,
  LockClosedIcon,
  ServerIcon,
  TagIcon,
  TicketIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const { useLogout } = useAuth();
  const logoutMutation = useLogout();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [expandedNav, setExpandedNav] = useState(null);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
  }, [sidebarExpanded]);

  const toggleNav = (label) => {
    setExpandedNav(expandedNav === label ? null : label);
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: ChartBarIcon,
    },
    {
      label: "Points Management",
      type: "dropdown",
      icon: CurrencyDollarIcon,
      subItems: [
        {
          label: "Points Criteria",
          path: "/points-criteria",
          icon: CurrencyDollarIcon,
        },
        {
          label: "Transactions",
          path: "/transactions",
          icon: ArrowPathIcon,
        },
        { label: "Rules & Expiry", path: "/rules", icon: Cog6ToothIcon },

        { label: "Tiers", path: "/tiers", icon: TrophyIcon },
      ],
    },
    {
      label: "Customer Management",
      type: "dropdown",
      icon: UserGroupIcon,
      subItems: [
        {
          label: "Customers",
          path: "/customers",
          icon: UsersIcon,
        },
        {
          label: "Support",
          path: "/support",
          icon: ChatBubbleLeftRightIcon,
        },
      ],
    },
    {
      label: "Reference Data",
      type: "dropdown",
      icon: Cog6ToothIcon,
      subItems: [
        {
          label: "Categories",
          path: "/categories",
          icon: TagIcon,
        },
        {
          label: "Brands",
          path: "/brands",
          icon: BuildingStorefrontIcon,
        },
        {
          label: "Apps",
          path: "/apps",
          icon: DevicePhoneMobileIcon,
        },
        {
          label: "Service Providers",
          path: "/trigger-services",
          icon: ServerIcon,
        },
        {
          label: "Trigger Events",
          path: "/trigger-events",
          icon: CalendarDateRangeIcon,
        },
      ],
    },
    {
      label: "Offers & Promotions",
      type: "dropdown",
      icon: TagIcon,
      subItems: [
        {
          label: "Khedmah Offers",
          path: "/khedma-offers",
          icon: TicketIcon,
        },
        {
          label: "Merchant Offers",
          path: "/merchant-offers",
          icon: TicketIcon,
        },
      ],
    },
    {
      label: "System & Settings",
      type: "dropdown",
      icon: Cog6ToothIcon,
      subItems: [
        {
          label: "Sub Admin",
          path: "/users",
          icon: UsersIcon,
        },
        {
          label: "Role & Accesses",
          path: "/role",
          icon: LockClosedIcon,
        },
        {
          label: "SDK & API Access",
          path: "/sdk-access",
          icon: CodeBracketIcon,
        },
        {
          label: "Theme Settings",
          path: "/theme",
          icon: Cog6ToothIcon,
        },
      ],
    },
    {
      label: "Audit",
      type: "dropdown",
      icon: AdjustmentsHorizontalIcon,
      subItems: [
        {
          label: "Reports",
          path: "/reports",
          icon: DocumentChartBarIcon,
        },
        {
          label: "Admin-System Logs",
          path: "/system-logs",
          icon: CodeBracketIcon,
        },

        {
          label: "User-API Logs",
          path: "/api-logs",
          icon: CommandLineIcon,
        },
        {
          label: "Authentication-Logs",
          path: "/auth-logs",
          icon: CommandLineIcon,
        },
      ],
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-62.5 flex-col overflow-y-hidden bg-[#2B5C3F] duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5.5">
        <NavLink to="/dashboard" className="text-xl font-semibold text-white">
          Khedmah Loyalty
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <ArrowLeftCircleIcon className="h-5 w-5 text-white" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) =>
          item.type === "dropdown" ? (
            <div key={item.label}>
              <button
                onClick={() => toggleNav(item.label)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  item.subItems.some((subItem) => pathname === subItem.path)
                    ? "text-white bg-green-700/90"
                    : "text-gray-300 hover:bg-green-700/50 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
                {expandedNav === item.label ? (
                  <ChevronDownIcon className="w-4 h-4" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4" />
                )}
              </button>

              {expandedNav === item.label && (
                <div className="ml-4 mt-2 space-y-1 mr-2">
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${
                        pathname.startsWith(subItem.path)
                          ? "text-white bg-green-800"
                          : "text-gray-200 hover:bg-green-700/30 hover:text-white"
                      }`}
                    >
                      {subItem.icon && <subItem.icon className="w-4 h-4" />}
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                pathname.startsWith(item.path)
                  ? "text-white bg-green-700/90 "
                  : "text-gray-300 hover:bg-green-700/50 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="ml-3">{item.label}</span>
            </NavLink>
          )
        )}
      </nav>

      <div className="mt-auto flex justify-center py-4 w-full">
        <button
          className="text-sm font-medium hover:bg-green-700/50 hover:text-white text-white w-full px-4 py-2 flex items-center gap-2 justify-center"
          onClick={() => logoutMutation.mutate()}
        >
          <ArrowLeftEndOnRectangleIcon className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
