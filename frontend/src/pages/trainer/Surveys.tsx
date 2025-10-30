import PageHeader from "../../components/PageHeader";

const Surveys = () => {
  const surveys = [
    {
      client: "Juan Pérez",
      date: "2025-09-15",
      score: 8,
      comment: "Rutina desafiante, muy buen seguimiento",
    },
    {
      client: "María López",
      date: "2025-09-16",
      score: 7,
      comment: "Me gustaría más variedad de ejercicios",
    },
    {
      client: "Carlos Díaz",
      date: "2025-09-17",
      score: 9,
      comment: "Excelente atención y motivación",
    },
  ];

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Encuestas" />

      <div className="space-y-4">
        {surveys.map((s, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-md border border-zinc-200 transition hover:shadow-xl"
          >
            <div className="flex justify-between items-center">
              <p className="text-zinc-900 font-semibold text-lg">{s.client}</p>
              <p className="text-zinc-500 text-sm">{s.date}</p>
            </div>
            <p className="text-zinc-600 mt-2">
              Puntaje: <span className="font-bold">{s.score}/10</span>
            </p>
            <p className="text-zinc-600 mt-1">Comentario: {s.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Surveys;
