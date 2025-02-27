import { createBrowserRouter } from "react-router-dom";
import Layout from "../ui/Layout";
import PointsCriteria from "../pages/points-management/PointsCriteria";
import Tiers from "../pages/points-management/Tiers";
import LoginPage from "../pages/LoginPage";
import Customer from "../pages/customer-management/Customer";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/points-management/Transactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/points-criteria",
    element: (
      <Layout>
        <PointsCriteria />
      </Layout>
    ),
  },
  {
    path: "/tiers",
    element: (
      <Layout>
        <Tiers />
      </Layout>
    ),
  },
  {
    path: "/transactions",
    element: (
      <Layout>
        <Transactions />
      </Layout>
    ),
  },
  {
    path: "/customers",
    element: (
      <Layout>
        <Customer />
      </Layout>
    ),
  },
]);

export default router;
