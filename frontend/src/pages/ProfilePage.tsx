import PageHeader from "../components/PageHeader";

const ProfilePage = () => {
  return (
    <div className="p-4 bg-zinc-50 min-h-screen space-y-6">
      <PageHeader title="Perfil" />

      <div className="bg-white rounded-2xl p-6 shadow-md border border-zinc-200 flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-zinc-200 rounded-full" />{" "}
        {/* Avatar placeholder */}
        <h2 className="text-xl font-semibold text-zinc-900">Juan Pérez</h2>
        <p className="text-zinc-500">juan.perez@email.com</p>
        <button className="mt-4 w-full bg-zinc-900 text-white py-3 rounded-2xl font-semibold hover:bg-zinc-800 transition">
          Editar perfil
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200 space-y-2">
        <h3 className="text-zinc-900 font-semibold">Detalles</h3>
        <p className="text-zinc-500">Membresía: Activa</p>
        <p className="text-zinc-500">Tipo: Premium</p>
        <p className="text-zinc-500">Días restantes: 45</p>
      </div>
    </div>
  );
};

export default ProfilePage;
