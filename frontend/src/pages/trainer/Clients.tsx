import PageHeader from "../../components/PageHeader";

const Clients = () => {
  // Datos simulados
  const clients = [
    { name: "Juan Pérez", age: 28, progress: "Intermedio" },
    { name: "María López", age: 32, progress: "Avanzado" },
    { name: "Carlos Díaz", age: 25, progress: "Principiante" },
  ];

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Clientes" />

      <div className="space-y-4">
        {clients.map((client, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-md border border-zinc-200 flex justify-between items-center transition hover:shadow-xl"
          >
            <div>
              <p className="text-zinc-900 font-semibold text-lg">
                {client.name}
              </p>
              <p className="text-zinc-600 text-sm mt-1">Edad: {client.age}</p>
              <p className="text-zinc-600 text-sm">Nivel: {client.progress}</p>
            </div>
            <div className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm">
              {client.progress}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
