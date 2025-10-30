import { Link } from "react-router-dom";
import {
  Dumbbell,
  BarChart2,
  User,
  Flame,
  Home,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const todayExercises = [
  {
    name: "Press banca",
    description: "Pecho con barra",
    sets: 4,
    reps: "8-10",
  },
  { name: "Fondos", description: "Paralelas", sets: 3, reps: "Fallo" },
  { name: "Aperturas", description: "Mancuernas", sets: 3, reps: 12 },
];

const upcomingExercises = [
  { name: "Remo con barra", description: "Espalda" },
  { name: "Curl bíceps", description: "Bíceps" },
  { name: "Press francés", description: "Tríceps" },
];

const DashboardHome = () => {
  const userName = "Usuario";
  const today = new Date();
  const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: es });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-20 bg-slate-900 text-white flex flex-col items-center py-6 space-y-6">
        <div className="text-2xl font-bold tracking-tight">🏋️‍♂️</div>
        <nav className="flex flex-col space-y-6">
          <Link
            to="/"
            className="flex items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            <Home className="w-6 h-6" />
          </Link>
          <Link
            to="/routine"
            className="flex items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            <Dumbbell className="w-6 h-6" />
          </Link>
          <Link
            to="/progress"
            className="flex items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            <BarChart2 className="w-6 h-6" />
          </Link>
          <Link
            to="/profile"
            className="flex items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            <User className="w-6 h-6" />
          </Link>
        </nav>
        <div className="mt-auto text-xs opacity-50">v1.0</div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Hola, {userName}</h1>
            <p className="text-slate-500 capitalize">{formattedDate}</p>
          </div>
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
            alt="avatar"
            className="w-12 h-12 rounded-full border border-slate-200"
          />
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progreso */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-slate-500 text-sm font-medium mb-2">
              Progreso semanal
            </h3>
            <p className="text-3xl font-bold text-slate-900">+12%</p>
            <div className="mt-3 h-2 bg-slate-200 rounded-full">
              <div className="w-[70%] h-2 bg-green-500 rounded-full" />
            </div>
          </div>

          {/* Calorías */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-slate-500 text-sm font-medium mb-2">
              Calorías quemadas
            </h3>
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500 w-5 h-5" />
              <p className="text-3xl font-bold">2.480 kcal</p>
            </div>
          </div>

          {/* Peso corporal */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-slate-500 text-sm font-medium mb-2">
              Peso actual
            </h3>
            <p className="text-3xl font-bold text-slate-900">78.4 kg</p>
            <span className="text-green-600 text-sm font-semibold">
              -1.1 kg desde el mes pasado
            </span>
          </div>
        </div>

        {/* SECCIONES PRINCIPALES */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
          {/* Rutina de hoy */}
          <section className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Tu rutina de hoy
              </h2>
              <Link
                to="/routine"
                className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1"
              >
                Ver todas <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayExercises.map((ex, i) => (
                <div
                  key={i}
                  className="border border-slate-100 bg-slate-50 hover:bg-slate-100 transition rounded-xl p-4 flex flex-col"
                >
                  <h3 className="text-slate-900 font-semibold">{ex.name}</h3>
                  <p className="text-slate-500 text-sm">{ex.description}</p>
                  <div className="mt-auto pt-3 border-t border-slate-200 flex justify-between text-sm">
                    <div>
                      <p className="text-slate-500">Series</p>
                      <p className="font-bold">{ex.sets}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Reps</p>
                      <p className="font-bold">{ex.reps}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Próximas rutinas */}
          <aside className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Próximas rutinas
            </h2>
            <div className="space-y-3">
              {upcomingExercises.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition"
                >
                  <div>
                    <h3 className="text-slate-800 font-semibold">{ex.name}</h3>
                    <p className="text-sm text-slate-500">{ex.description}</p>
                  </div>
                  <ChevronRight className="text-slate-400" />
                </div>
              ))}
            </div>

            {/* Banner motivacional */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
              <h3 className="text-lg font-bold">¡Seguí avanzando!</h3>
              <p className="text-blue-100 text-sm mt-1 mb-4">
                Cada entrenamiento cuenta, estás más cerca de tu meta.
              </p>
              <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 transition">
                Ver progreso
              </button>
              <Dumbbell className="absolute -right-6 -top-6 w-24 h-24 text-white/10" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
