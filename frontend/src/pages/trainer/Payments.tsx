import PageHeader from "../../components/PageHeader";

const Payments = () => {
  // Datos simulados: pagos que el entrenador debe a administración
  const payments = [
    { month: "Septiembre", amount: 5000, status: "Pendiente" },
    { month: "Agosto", amount: 5000, status: "Pagado" },
    { month: "Julio", amount: 5000, status: "Pagado" },
  ];

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Pagos a Administración" />

      <div className="space-y-4">
        {payments.map((p, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-md border border-zinc-200 flex justify-between items-center transition hover:shadow-xl"
          >
            <div>
              <p className="text-zinc-900 font-semibold text-lg">{p.month}</p>
              <p className="text-zinc-600 mt-1 text-sm">Monto: ${p.amount}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                p.status === "Pagado" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
