import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import TodayRoutine from "../components/TodayRoutine";
import UpcomingRoutine from "../components/UpcomingRoutine";
import { Dumbbell, BarChart2, CreditCard, User } from "lucide-react";

const DashboardHome = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const todayExercises = [
    {
      name: "Press banca",
      description: "Pecho con barra",
      sets: 4,
      reps: "8-10",
      icon: <Dumbbell />,
    },
    {
      name: "Fondos",
      description: "Paralelas",
      sets: 3,
      reps: "Hasta el fallo",
      icon: <Dumbbell />,
    },
    {
      name: "Aperturas",
      description: "Mancuernas",
      sets: 3,
      reps: 12,
      icon: <Dumbbell />,
    },
  ];

  const upcomingExercises = [
    {
      name: "Remo con barra",
      description: "Espalda",
      sets: 4,
      reps: 10,
      icon: <Dumbbell />,
    },
    {
      name: "Curl bíceps",
      description: "Bíceps",
      sets: 3,
      reps: 12,
      icon: <Dumbbell />,
    },
  ];

  const dashboardOptions = [
    {
      name: "Rutinas",
      icon: <Dumbbell className="w-10 h-10 text-white" />,
      route: "/rutinas",
    },
    {
      name: "Progreso",
      icon: <BarChart2 className="w-10 h-10 text-white" />,
      route: "/progress",
    },
    {
      name: "Pagos",
      icon: <CreditCard className="w-10 h-10 text-white" />,
      route: "/payments",
    },
    {
      name: "Cuenta",
      icon: <User className="w-10 h-10 text-white" />,
      route: "/profile",
    },
  ];

  if (selectedSection) {
    return (
      <div className="p-4 bg-zinc-50 min-h-screen">
        <PageHeader title={selectedSection} />
        <button
          className="mb-4 text-zinc-500 hover:text-zinc-900"
          onClick={() => setSelectedSection(null)}
        >
          ← Volver
        </button>
        <p className="text-zinc-600 mt-4">
          Contenido de {selectedSection} aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Inicio" />

      {/* Banner de publicidad */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-700 text-white rounded-2xl p-4 flex items-center justify-center text-center shadow-md">
        <p className="text-lg font-semibold">
          ¡No te pierdas nuestra promoción de 3 meses por 2!
        </p>
      </div>

      {/* Opciones del Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        {dashboardOptions.map((opt) => (
          <button
            key={opt.name}
            onClick={() => navigate(opt.route)}
            className="bg-zinc-900 rounded-2xl p-6 flex flex-col items-center justify-center hover:scale-105 transition transform shadow-md"
          >
            {opt.icon}
            <span className="mt-3 text-white font-semibold">{opt.name}</span>
            <span className="mt-1 text-zinc-300 text-sm">{opt.summary}</span>
          </button>
        ))}
      </div>

      {/* Rutinas Hoy (scroll horizontal) */}
      <section>
        <h2 className="text-xl font-bold text-zinc-900 mt-4 mb-3">
          Rutinas Hoy
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {todayExercises.map((ex, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 min-w-[200px] flex flex-col justify-between shadow-sm border border-zinc-200"
            >
              <div className="flex items-center space-x-2">
                {ex.icon}
                <h3 className="text-zinc-900 font-semibold">{ex.name}</h3>
              </div>
              <p className="text-zinc-500 text-sm mt-2">{ex.description}</p>
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-zinc-500 text-sm">Series</p>
                  <p className="text-zinc-900 font-bold">{ex.sets}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Reps</p>
                  <p className="text-zinc-900 font-bold">{ex.reps}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Próximas rutinas */}
      <section>
        <h2 className="text-xl font-bold text-zinc-900 mt-6 mb-3">
          Próximas Rutinas
        </h2>
        <UpcomingRoutine exercises={upcomingExercises} />
      </section>
    </div>
  );
};

export default DashboardHome;
