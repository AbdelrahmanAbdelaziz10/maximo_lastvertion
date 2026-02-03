import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import SingUpPage from "./Pages/auth/SingUpPage";
import PasswordRecoveryPage from "./Pages/auth/PasswordRecoveryPage";
import ServiceRequest from "./Pages/serviceRequest/ServiceRequest";
import WorkOrder from "./Pages/workOrder/WorkOrder";
import { DashBoard } from "./Pages/dashboard/DashBoard";
import ServiceRequestPage from "./Pages/serviceRequest/ServiceRequestPage";
import ViewerCad from "./Pages/viewer/ViewerCad";
import CreateSR from "./Pages/serviceRequest/CreateSR";
import WorkOrderPage from "./Pages/workOrder/WorkOrderPage";
import SRUpdate from "./Pages/serviceRequest/SRUpdate";
import ProtectedRoute from "./Routes/ProtectedRoute";
import LoginPage from "./Pages/auth/LoginTest";
import MainLayout from "./layouts/MainLayout";
import SRPagesTest from "./Pages/serviceRequest/SRPagesTest";
import AssetsPage from "./Pages/Assets/AssetsPage";
import AssetsDetails from "./Pages/Assets/AssetsDetails";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        // 👇 أول ما يفتح الموقع
        {
          index: true,
          element: <Navigate to="login" replace />,
        },

        {
          path: "login",
          element: <LoginPage />,
        },

        {
          element: (
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "dashboard", element: <DashBoard /> },
            { path: "service-request", element: <ServiceRequest /> },
            { path: "service-request/:id", element: <ServiceRequestPage /> },
            { path: "work-orders", element: <WorkOrder /> },
            { path: "work-orders/:id", element: <WorkOrderPage /> },
            { path: "viewer", element: <ViewerCad /> },
            { path: "Create-SR", element: <CreateSR /> },
            { path: "update-SR/:id", element: <SRUpdate /> },
            { path: "Test-SR/:id", element: <SRPagesTest /> },
            { path: "assets", element: <AssetsPage /> },
            // { Path: "Assets/:id", element: <AssetsDetails /> },
            { path: "assets_details", element: <AssetsDetails /> },
          ],
        },
      ],
    },
  ],
  { basename: "/maximo/" },
);

export default router;
