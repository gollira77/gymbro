// src/components/PageHeader.tsx
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-between my-6">
      {/* Botón atrás */}
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-zinc-100 transition"
        aria-label="Volver atrás"
      >
        <FaAngleLeft className="text-3xl text-zinc-800" />
      </button>

      {/* Título centrado */}
      <h1 className=" text-2xl font-bold text-zinc-900">{title}</h1>

      {/* Placeholder invisible a la derecha para balancear */}
      <div className="w-1" />
    </div>
  );
};

export default PageHeader;
