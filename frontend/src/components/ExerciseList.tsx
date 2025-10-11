import ExerciseCard from "./ExerciseCard";

interface Exercise {
  name: string;
  description?: string;
  sets: number;
  reps: number | string;
  icon?: React.ReactNode;
}

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseList = ({ exercises }: ExerciseListProps) => {
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

export default ExerciseList;
