// src/pages/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // y un Navbar

const DashboardLayout = () => {
  return (
    <div className="flex">
      <main className="grow p-5">
        <Navbar /> {/* La barra de navegación superior */}
        {/* Aquí es donde se renderizará el contenido de cada ruta hija */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
