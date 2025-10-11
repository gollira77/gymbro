import PageHeader from "../components/PageHeader";

interface ExerciseProgress {
  name: string;
  weeklyProgress: number[]; // progreso semanal últimos 6 entrenamientos (0-100%)
}

const exercises: ExerciseProgress[] = [
  { name: "Press banca", weeklyProgress: [60, 65, 70, 75, 80, 85] },
  { name: "Fondos", weeklyProgress: [40, 45, 50, 55, 60, 65] },
  { name: "Remo con barra", weeklyProgress: [20, 25, 30, 35, 40, 50] },
  { name: "Curl bíceps", weeklyProgress: [50, 55, 60, 65, 70, 75] },
];

const ProgressPage = () => {
  // Resumen general
  const totalExercises = exercises.length;
  const avgProgress = Math.round(
    exercises.reduce(
      (sum, ex) => sum + ex.weeklyProgress[ex.weeklyProgress.length - 1],
      0,
    ) / totalExercises,
  );

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Progreso" />

      {/* Resumen general */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200 space-y-2">
        <h2 className="text-zinc-900 font-semibold text-lg">Resumen General</h2>
        <p className="text-zinc-600">
          Ejercicios registrados: {totalExercises}
        </p>
        <p className="text-zinc-600">Progreso promedio: {avgProgress}%</p>
      </div>

      {/* Estadísticas por ejercicio */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200 space-y-6">
        <h2 className="text-zinc-900 font-semibold text-lg">
          Estadísticas por ejercicio
        </h2>

        {exercises.map((ex, idx) => {
          const latestProgress =
            ex.weeklyProgress[ex.weeklyProgress.length - 1];
          return (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-900 font-semibold">{ex.name}</span>
                <span className="text-zinc-600 text-sm">{latestProgress}%</span>
              </div>

              {/* Torres de progreso semanal */}
              <div className="flex items-end space-x-2 h-36">
                {ex.weeklyProgress.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col items-center w-6">
                    <div
                      className="bg-zinc-900 rounded-t-xl transition-all"
                      style={{ height: `${week * 1.2}px`, width: "100%" }}
                    ></div>
                    <span className="text-zinc-500 text-xs mt-1">
                      S{wIdx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Evolución general */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200 space-y-2">
        <h2 className="text-zinc-900 font-semibold text-lg">
          Evolución general
        </h2>
        <p className="text-zinc-600 text-sm">
          Cada torre representa el progreso semanal de los ejercicios
          principales. Puedes comparar tu evolución y ver dónde mejorar.
        </p>
      </div>
    </div>
  );
};

export default ProgressPage;
