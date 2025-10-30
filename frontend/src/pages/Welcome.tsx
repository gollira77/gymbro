import React from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/img/hero.jpg";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex items-center justify-center bg-blue-400">
      <div className="bg-white shadow-lg w-full h-dvh text-center flex flex-col justify-between">
        {/* Hero / logo */}
        <div className="h-4/6">
          <img
            className="mask-b-from-70% mask-b-to-100% w-full h-full object-cover"
            src={heroImg}
          />
        </div>

        <div className="mb-4 p-6 h-2/6">
          <h1 className="text-4xl font-bold">GYMBRO</h1>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Forja tu fuerza, transforma tu vida
          </p>
          {/* Botones principales */}
          <Link
            to="/login"
            className="block w-full bg-black text-white py-2 rounded-lg mb-3 text-center font-medium"
          >
            Iniciar Sesion
          </Link>

          <Link
            to="/register"
            className="block w-full border border-gray-300 py-2 rounded-lg mb-2 text-center font-medium text-gray-700"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
