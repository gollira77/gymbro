import ExerciseCard from "./ExerciseCard";
import type { ReactNode } from "react";

interface Exercise {
  name: string;
  description?: string;
  sets: number;
  reps: number | string;
  icon?: ReactNode;
}

interface UpcomingRoutineProps {
  exercises: Exercise[];
}

const UpcomingRoutine = ({ exercises }: UpcomingRoutineProps) => {
  return (
    <div className="space-y-4">
      {exercises.map((ex, i) => (
        <ExerciseCard
          key={i}
          name={ex.name}
          description={ex.description}
          sets={ex.sets}
          reps={ex.reps}
          icon={ex.icon}
        />
      ))}
    </div>
  );
};

export default UpcomingRoutine;
