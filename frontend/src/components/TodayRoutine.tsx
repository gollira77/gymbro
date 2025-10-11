import { useState } from "react";
import ExerciseCard from "./ExerciseCard";
import type { ReactNode } from "react";

interface Exercise {
  name: string;
  description?: string;
  sets: number;
  reps: number | string;
  icon?: ReactNode;
}

interface TodayRoutineProps {
  exercises: Exercise[];
}

const TodayRoutine = ({ exercises }: TodayRoutineProps) => {
  const [completedState, setCompletedState] = useState(
    exercises.map(() => false),
  );

  const toggleComplete = (index: number) => {
    const updated = [...completedState];
    updated[index] = !updated[index];
    setCompletedState(updated);
  };

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
          completed={completedState[i]}
          onToggleComplete={() => toggleComplete(i)}
        />
      ))}
    </div>
  );
};

export default TodayRoutine;
