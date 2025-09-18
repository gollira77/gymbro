import type { ReactNode } from "react";

interface ExerciseCardProps {
  name: string;
  description?: string;
  icon?: ReactNode;
  sets: number;
  reps: number | string;
  completed?: boolean;
  onToggleComplete?: () => void;
}

const ExerciseCard = ({
  name,
  description,
  icon,
  sets,
  reps,
  completed = false,
  onToggleComplete,
}: ExerciseCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition relative space-y-3 sm:space-y-0">
      {/* Toggle completado */}
      {onToggleComplete && (
        <button
          onClick={onToggleComplete}
          className={`absolute top-3 right-3 w-6 h-6 rounded-full border flex items-center justify-center transition ${
            completed
              ? "bg-black border-black"
              : "border-zinc-300 hover:bg-zinc-100"
          }`}
          aria-label="Marcar completado"
        >
          {completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      )}

      {/* Izquierda: Icono + info */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {icon && (
          <div className="text-zinc-600 text-3xl sm:text-4xl">{icon}</div>
        )}
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
            {name}
          </h3>
          {description && (
            <p className="text-sm sm:text-base text-zinc-500 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Derecha: Sets / Reps */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end space-x-6 sm:space-x-0 sm:space-y-1 mt-2 sm:mt-0">
        <div className="flex flex-col items-center sm:items-end">
          <span className="text-sm text-zinc-500">Series</span>
          <span className="text-lg font-bold text-zinc-900">{sets}</span>
        </div>
        <div className="flex flex-col items-center sm:items-end">
          <span className="text-sm text-zinc-500">Reps</span>
          <span className="text-lg font-bold text-zinc-900">{reps}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
