import { createBrowserRouter } from "react-router-dom";
import Layout from "../ui/Layout";
import PointsCriteria from "../pages/points-management/PointsCriteria";
import Tiers from "../pages/points-management/Tiers";
import LoginPage from "../pages/LoginPage";
import Customer from "../pages/customer-management/Customer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <h1>Dashboard</h1>
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
    path: "/customers",
    element: (
      <Layout>
        <Customer />
      </Layout>
    ),
  },
]);

export default router;
