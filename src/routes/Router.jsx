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
  { path: "/privacy", element: withLayout(Privacy) },
  { path: "role", element: withLayout(Role) },
]);

export default router;
