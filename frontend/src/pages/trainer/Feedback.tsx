import PageHeader from "../../components/PageHeader";

const Feedback = () => {
  // Datos simulados
  const feedbackList = [
    {
      client: "Juan Pérez",
      message: "Me gustó la rutina de pecho, fue intensa!",
    },
    { client: "María López", message: "Podríamos agregar más cardio." },
    { client: "Carlos Díaz", message: "Excelente seguimiento y motivación." },
  ];

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Feedback" />

      <div className="space-y-4">
        {feedbackList.map((f, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-md border border-zinc-200 transition hover:shadow-xl"
          >
            <p className="text-zinc-900 font-semibold text-lg">{f.client}</p>
            <p className="text-zinc-600 mt-2">{f.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
