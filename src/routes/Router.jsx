import { createBrowserRouter } from "react-router-dom";
import Layout from "../ui/Layout";
import PointsCriteria from "../pages/points-management/PointsCriteria";
import Tiers from "../pages/points-management/Tiers";

const router = createBrowserRouter([
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
        <h1>Users</h1>
      </Layout>
    ),
  },
]);

export default router;
