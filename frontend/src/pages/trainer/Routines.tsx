import PageHeader from "../../components/PageHeader";
import { Dumbbell } from "lucide-react";

const Routines = () => {
  const routines = [
    {
      name: "Full Body",
      description: "Rutina completa para todo el cuerpo",
      icon: <Dumbbell />,
    },
    {
      name: "Piernas",
      description: "Fuerza y resistencia en piernas",
      icon: <Dumbbell />,
    },
    {
      name: "Pecho y Tríceps",
      description: "Enfocado en la parte superior",
      icon: <Dumbbell />,
    },
  ];

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Rutinas" />

      <div className="space-y-4">
        {routines.map((r, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-md border border-zinc-200 flex items-center space-x-4 transition hover:shadow-xl"
          >
            <div className="text-green-500 text-2xl">{r.icon}</div>
            <div>
              <p className="text-zinc-900 font-semibold text-lg">{r.name}</p>
              <p className="text-zinc-600 text-sm mt-1">{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routines;
