import { useState } from "react";
import Calendar from "../components/Calendar";
import PageHeader from "../components/PageHeader";
import TodayRoutine from "../components/TodayRoutine";
import { Dumbbell, Activity } from "lucide-react";

const RoutinePage = () => {
  const [selected, setSelected] = useState<Date[]>([]);

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
      description: "En paralelas",
      sets: 3,
      reps: "Hasta el fallo",
      icon: <Activity />,
    },
    {
      name: "Aperturas",
      description: "Mancuernas banco inclinado",
      sets: 3,
      reps: 12,
      icon: <Dumbbell />,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <PageHeader title="Rutina" />

      <Calendar onSelect={(dates) => setSelected(dates)} />

      <h2 className="text-2xl font-bold text-zinc-900 mt-4">Hoy</h2>
      <TodayRoutine exercises={todayExercises} />
    </div>
  );
};

export default RoutinePage;
