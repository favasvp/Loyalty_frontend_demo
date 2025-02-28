import { createBrowserRouter } from "react-router-dom";
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
const withLayout = (Component) => (
  <Layout>
    <Component />
  </Layout>
);

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/dashboard", element: withLayout(Dashboard) },
  { path: "/points-criteria", element: withLayout(PointsCriteria) },
  { path: "/tiers", element: withLayout(Tiers) },
  { path: "/transactions", element: withLayout(Transactions) },
  { path: "/customers", element: withLayout(Customer) },
  { path: "/users", element: withLayout(Users) },
  { path: "/role", element: withLayout(Role) },
  { path: "/merchant-offers", element: withLayout(MerchantOfters) },
  { path: "/system-logs", element: withLayout(Privacy) },
  { path: "/role-logs", element: withLayout(RoleLogs) },
  { path: "/api-logs", element: withLayout(ApiLogs) },
  { path: "/apps", element: withLayout(Apps) },
  { path: "/brands", element: withLayout(Brands) },
  { path: "/categories", element: withLayout(Categories) },
  { path: "/rules", element: withLayout(Rules) },
]);

export default router;
