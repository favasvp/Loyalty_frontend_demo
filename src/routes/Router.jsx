import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../ui/Layout";
import PointsCriteria from "../pages/points-management/PointsCriteria";
import Tiers from "../pages/points-management/Tiers";
import LoginPage from "../pages/LoginPage";
import Customer from "../pages/customer-management/Customer";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/points-management/Transactions";
import Users from "../pages/system-and-settings/Users";
import Privacy from "../pages/system-and-settings/Privacy";
import Role from "../pages/system-and-settings/Role";
import MerchantOfters from "../pages/ofters-and-promotions/MerchantOfters";
import RoleLogs from "../pages/audit/RoleLogs";
import ApiLogs from "../pages/audit/ApiLogs";
import Apps from "../pages/reference-data/Apps";
import Brands from "../pages/reference-data/Brands";
import Categories from "../pages/reference-data/Categories";
import Rules from "../pages/points-management/Rules";
import Reports from "../pages/audit/Reports";
import Theme from "../pages/system-and-settings/Theme";
import { AuthProvider } from "../ui/AuthProvider";

// Root layout with AuthProvider
const RootLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

// Protected layout with Layout component
const ProtectedLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LoginPage /> },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/points-criteria", element: <PointsCriteria /> },
          { path: "/tiers", element: <Tiers /> },
          { path: "/transactions", element: <Transactions /> },
          { path: "/customers", element: <Customer /> },
          { path: "/users", element: <Users /> },
          { path: "/role", element: <Role /> },
          { path: "/merchant-offers", element: <MerchantOfters /> },
          { path: "/system-logs", element: <Privacy /> },
          { path: "/role-logs", element: <RoleLogs /> },
          { path: "/api-logs", element: <ApiLogs /> },
          { path: "/apps", element: <Apps /> },
          { path: "/brands", element: <Brands /> },
          { path: "/categories", element: <Categories /> },
          { path: "/rules", element: <Rules /> },
          { path: "/reports", element: <Reports /> },
          { path: "/theme", element: <Theme /> },
        ],
      },
    ],
  },
]);

export default router;
