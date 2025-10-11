// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

//import Home from "./pages/Home";
//import AdminPage from "./pages/AdminPage";
//import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import RoutinePage from "./pages/RoutinePage";
import DashboardHome from "./pages/DashboardHome";
import PaymentsPage from "./pages/PaymentsPage";
import ProfilePage from "./pages/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
//import Forbidden from "./pages/Forbidden";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirige de "/" a "/welcome" */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />

          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/routine" element={<RoutinePage />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/progress" element={<ProgressPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/403" element={<h1> No puedes iniciar secion </h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
