// src/routes/UserRoutes.tsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../pages/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import RoutinePage from "../pages/RoutinePage";
import PaymentsPage from "../pages/PaymentsPage";
import ProfilePage from "../pages/ProfilePage";
import ProgressPage from "../pages/ProgressPage";

const UserRoutes = () => (
  <Route
    path="/dashboard"
    element={
      // <ProtectedRoute>
      <DashboardLayout />
      // </ProtectedRoute>
    }
  >
    {/* La ruta "index" es la que se muestra en "/dashboard" */}
    <Route index element={<DashboardHome />} />
    <Route path="routine" element={<RoutinePage />} />
    <Route path="payments" element={<PaymentsPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="progress" element={<ProgressPage />} />
  </Route>
);

export default UserRoutes;
