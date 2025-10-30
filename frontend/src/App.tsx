// App.tsx (Refactorizado)
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Importa tus componentes de página y rutas modulares
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import Welcome from "./pages/Welcome";
import UserRoutes from "./routes/UserRoutes";

const App = () => {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Rutas de Dashboard de Usuario (Protegidas y con Layout) --- */}
        {UserRoutes()}

        {/* --- Rutas de Dashboard de Entrenador (Protegidas y con Layout) --- */}

        {/* --- Otras Rutas --- */}
        <Route path="/test" element={<Test />} />
        <Route path="/403" element={<h1>Acceso denegado</h1>} />

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
};

export default App;
