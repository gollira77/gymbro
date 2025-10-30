import PageHeader from "../components/PageHeader";

const Test = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 space-y-6">
      <PageHeader title="Dashboards" />

      <div className="flex flex-col w-full max-w-xs space-y-4">
        <a
          href="/trainer"
          className="w-full bg-black text-white py-3 rounded-lg text-center font-medium shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
        >
          Entrenador
        </a>
        <a
          href="/dashboard"
          className="w-full bg-black text-white py-3 rounded-lg text-center font-medium shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
        >
          Cliente
        </a>
      </div>
    </div>
  );
};

export default Test;
