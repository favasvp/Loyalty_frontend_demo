import {
  AdjustmentsHorizontalIcon,
  ArrowLeftCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowPathIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  DocumentChartBarIcon,
  LockClosedIcon,
  TagIcon,
  TicketIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useUiStore, {
  selectSidebarExpanded,
  selectExpandedNav,
} from "../store/ui";
import { useAuthContext } from "./AuthProvider";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const { logout } = useAuthContext();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const sidebarExpanded = useUiStore(selectSidebarExpanded);
  const toggleSidebarExpanded = useUiStore(
    (state) => state.toggleSidebarExpanded
  );

  const expandedNav = useUiStore(selectExpandedNav);
  const toggleNav = useUiStore((state) => state.toggleNav);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname, sidebarOpen, setSidebarOpen]);

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
          label: "Trigger Events",
          path: "/trigger-events",
          icon: DevicePhoneMobileIcon,
        }, {
          label: "Trigger Services",
          path: "/trigger-services",
          icon: DevicePhoneMobileIcon,
        },
      ],
    },
    {
      label: "Offers & Promotions",
      type: "dropdown",
      icon: TagIcon,
      subItems: [
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
          label: "Users",
          path: "/users",
          icon: UsersIcon,
        },
        {
          label: "Role & Accesses",
          path: "/role",
          icon: LockClosedIcon,
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
          label: "System Logs",
          path: "/system-logs",
          icon: CodeBracketIcon,
        },
        {
          label: "Role Logs",
          path: "/role-logs",
          icon: LockClosedIcon,
        },
        {
          label: "API Logs",
          path: "/api-logs",
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
        <button className="text-sm font-medium hover:bg-green-700/50 hover:text-white text-white w-full px-4 py-2 flex items-center gap-2 justify-center">
          <ArrowLeftEndOnRectangleIcon className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
