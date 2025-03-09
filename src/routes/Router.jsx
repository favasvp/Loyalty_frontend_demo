import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "../ui/AuthProvider";
import Layout from "../ui/Layout";

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

// Lazy load all pages
const LoginPage = lazy(() => import("../pages/LoginPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const PointsCriteria = lazy(() => import("../pages/points-management/PointsCriteria"));
const Tiers = lazy(() => import("../pages/points-management/Tiers"));
const Transactions = lazy(() => import("../pages/points-management/Transactions"));
const Rules = lazy(() => import("../pages/points-management/Rules"));
const Customer = lazy(() => import("../pages/customer-management/Customer"));
const Users = lazy(() => import("../pages/system-and-settings/Users"));
const Role = lazy(() => import("../pages/system-and-settings/Role"));
const Privacy = lazy(() => import("../pages/system-and-settings/Privacy"));
const Theme = lazy(() => import("../pages/system-and-settings/Theme"));
const MerchantOfters = lazy(() => import("../pages/ofters-and-promotions/MerchantOfters"));
const RoleLogs = lazy(() => import("../pages/audit/RoleLogs"));
const ApiLogs = lazy(() => import("../pages/audit/ApiLogs"));
const Reports = lazy(() => import("../pages/audit/Reports"));
const Apps = lazy(() => import("../pages/reference-data/Apps"));
const Brands = lazy(() => import("../pages/reference-data/Brands"));
const Categories = lazy(() => import("../pages/reference-data/Categories"));



// Root layout with AuthProvider and Suspense
const RootLayout = () => (
  <AuthProvider>
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  </AuthProvider>
);

// Protected layout with Layout component
// eslint-disable-next-line react-refresh/only-export-components
const ProtectedLayout = ({ path }) => {
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

// Create a route with permission check
// const createProtectedRoute = (path, element, permissions = []) => ({
//   path,
//   element,
//   meta: {
//     requiredPermissions: permissions,
//   },
// });

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
