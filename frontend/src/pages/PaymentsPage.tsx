import PageHeader from "../components/PageHeader";

interface Payment {
  date: string;
  amount: string;
}

const PaymentsPage = () => {
  const nextPayment = { date: "20 Septiembre 2025", amount: "$25" };
  const history: Payment[] = [
    { date: "20 Agosto 2025", amount: "$20.000" },
    { date: "20 Julio 2025", amount: "$25.000" },
    { date: "20 Junio 2025", amount: "$25.000" },
  ];

  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Pagos" />

      {/* Próximo pago */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200">
        <p className="text-zinc-500 text-sm">Próximo pago:</p>
        <p className="text-zinc-900 font-bold text-lg mt-1">
          {nextPayment.amount} - {nextPayment.date}
        </p>
      </div>

      {/* Historial de pagos */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200">
        <p className="text-zinc-500 text-sm mb-2">Historial de pagos:</p>
        <ul className="divide-y divide-zinc-200">
          {history.map((p, i) => (
            <li key={i} className="py-2 flex justify-between text-zinc-900">
              <span>{p.date}</span>
              <span className="font-semibold">{p.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón de acción */}
      <button className="w-full bg-zinc-900 text-white py-3 rounded-2xl font-semibold hover:bg-zinc-800 transition">
        Agregar método de pago
      </button>
    </div>
  );
};

export default PaymentsPage;
