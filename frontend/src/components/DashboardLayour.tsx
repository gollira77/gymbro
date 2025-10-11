import type { ReactNode } from "react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [active, setActive] = useState("Rutinas");

  const menuItems = ["Rutinas", "Perfil", "Pagos", "Progreso", "Mensajes"];

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-zinc-50">
      {/* Sidebar */}
      <aside className="bg-white shadow-md sm:w-60 p-4 flex sm:flex-col justify-between sm:justify-start">
        <h1 className="text-2xl font-bold text-zinc-900 mb-6">Mi Gimnasio</h1>
        <nav className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-3">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`text-zinc-700 font-medium p-2 rounded-lg transition ${
                active === item
                  ? "bg-zinc-200 text-zinc-900"
                  : "hover:bg-zinc-100"
              }`}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 sm:p-8 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
