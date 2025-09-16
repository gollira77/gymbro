const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-2">Bienvenido al Dashboard</h1>
      <span className="mb-4 text-gray-700">
        ¡Has iniciado sesión exitosamente!
      </span>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;