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
import ApiLogs from "../pages/audit/ApiLogs";
import Apps from "../pages/reference-data/Apps";
import Brands from "../pages/reference-data/Brands";
import Categories from "../pages/reference-data/Categories";
import Rules from "../pages/points-management/Rules";
import Reports from "../pages/audit/Reports";
import Theme from "../pages/system-and-settings/Theme";
import { AuthProvider } from "../ui/AuthProvider";
import TriggerEvents from "../pages/reference-data/TriggerEvents";
import TriggerServices from "../pages/reference-data/TriggerServices";
import AuthLogs from "../pages/audit/AuthLogs";
import Support from "../pages/customer-management/Support";
import KhedmahOffer from "../pages/ofters-and-promotions/KhedmahOffer";
import SdkAccess from "../pages/system-and-settings/SdkAccess";
import PaymentMethods from "../pages/reference-data/PaymentMethods";
import {
  UserDashboard,
  PointsHistory,
  CouponDetails,
  UserProfile,
  UserLayout,
} from "../pages/user-facing-pages";
import DemoPage from "../pages/user-facing-pages/DemoPage";
import DashboardUser from "../pages/user-facing-pages/DashboardUser";
import UserOffers from "../pages/user-facing-pages/UserOffers";
import UserSupport from "../pages/user-facing-pages/UserSupport";
import AuthDemo from "../pages/user-facing-pages/AuthDemo";
const RootLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const ProtectedLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const UserFacingLayout = () => (
  <UserLayout>
    <Outlet />
  </UserLayout>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/demo", element: <DemoPage /> },
      { path: "/auth-demo", element: <AuthDemo /> },
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
          { path: "/khedma-offers", element: <KhedmahOffer /> },
          { path: "/merchant-offers", element: <MerchantOfters /> },
          { path: "/system-logs", element: <Privacy /> },
          { path: "/api-logs", element: <ApiLogs /> },
          { path: "/apps", element: <Apps /> },
          { path: "/brands", element: <Brands /> },
          { path: "/payment-methods", element: <PaymentMethods /> },
          { path: "/categories", element: <Categories /> },
          { path: "/rules", element: <Rules /> },
          { path: "/reports", element: <Reports /> },
          { path: "/theme", element: <Theme /> },
          { path: "/trigger-events", element: <TriggerEvents /> },
          { path: "/trigger-services", element: <TriggerServices /> },
          { path: "/auth-logs", element: <AuthLogs /> },
          { path: "/sdk-access", element: <SdkAccess /> },
          { path: "/support", element: <Support /> },
        ],
      },
      {
        path: "/user",
        element: <UserFacingLayout />,
        children: [
          { path: "/user/dashboard", element: <DashboardUser /> },
          { path: "/user/offers", element: <UserOffers /> },
          { path: "/user/history", element: <PointsHistory /> },
          { path: "/user/coupon/:id", element: <CouponDetails /> },
          { path: "/user/support", element: <UserSupport /> },
        ],
      },
    ],
  },
]);

export default router;
