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
//import Forbidden from "./pages/Forbidden";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Redirige de "/" a "/welcome" */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />

          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/403" element={ <h1> No puedes iniciar secion </h1> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
