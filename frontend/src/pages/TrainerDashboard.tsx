import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import {
  Users,
  Dumbbell,
  ClipboardList,
  MessageCircle,
  CreditCard,
  User,
} from "lucide-react";

const TrainerDashboard = () => {
  const navigate = useNavigate();

  const dashboardOptions = [
    {
      name: "Clientes",
      description: "Ver lista de clientes",
      icon: <Users className="w-10 h-10 text-white" />,
      route: "/trainer/clients",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "Rutinas",
      description: "Gestionar rutinas",
      icon: <Dumbbell className="w-10 h-10 text-white" />,
      route: "/trainer/routines",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Encuestas",
      description: "Resultados y métricas",
      icon: <ClipboardList className="w-10 h-10 text-white" />,
      route: "/trainer/surveys",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      name: "Feedback",
      description: "Comentarios de clientes",
      icon: <MessageCircle className="w-10 h-10 text-white" />,
      route: "/trainer/feedback",
      color: "bg-purple-500 hover:bg-purple-600",
    },
      // {
      //   name: "Pagos",
      //   description: "Gestión de cobros",
      //   icon: <CreditCard className="w-10 h-10 text-white" />,
      //   route: "/trainer/payments",
      //   color: "bg-pink-500 hover:bg-pink-600",
      // },
    {
      name: "Perfil",
      description: "Configuración",
      icon: <User className="w-10 h-10 text-white" />,
      route: "/trainer/profile",
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
  ];

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Dashboard Entrenador" />

      {/* Banner de bienvenida */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-2xl p-4 flex items-center justify-center text-center shadow-md">
        <p className="text-lg font-semibold">
          ¡Bienvenido entrenador! Administra tu equipo y rutinas aquí.
        </p>
      </div>

      {/* Opciones del Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        {dashboardOptions.map((opt) => (
          <button
            key={opt.name}
            onClick={() => navigate(opt.route)}
            className={`${opt.color} rounded-2xl p-6 flex flex-col items-center justify-center transition transform shadow-md hover:scale-105`}
          >
            {opt.icon}
            <span className="mt-3 text-white font-semibold">{opt.name}</span>
            <span className="mt-1 text-white text-sm">{opt.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrainerDashboard;
