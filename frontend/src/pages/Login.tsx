import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, LockKeyhole } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import portadaGym from "../assets/img/joven-entrenando-min.jpg";
import logo from "../assets/img/generic-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main
      className="relative flex min-h-screen w-full bg-black"
      style={{
        backgroundImage: `url(${portadaGym})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-h-screen">
        {/* LADO IZQUIERDO */}
        <div className="flex flex-col justify-between text-white w-full md:w-1/2 h-full px-8 sm:px-12 py-8 md:py-14">
          {/* Logo arriba */}
          <div className="flex items-start">
            <img
              src={logo}
              alt="GYMBRO Logo"
              className="h-10 w-auto object-contain select-none"
            />
          </div>

          {/* Texto motivacional abajo */}
          <div className="mt-auto mb-8 md:mb-16">
            <h2 className="text-5xl font-bold mb-3 leading-tight">
              Forja tu fuerza.
            </h2>
            <h3 className="text-4xl font-semibold mb-4">Transforma tu vida.</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Entrená donde quieras, cuando quieras. Conectá con tu mejor
              versión.
            </p>
          </div>
        </div>

        {/* FORMULARIO (lado derecho) */}
        <div className="flex justify-end items-center w-full md:w-1/2 h-full p-6 sm:p-10">
          <div className="w-full max-w-md bg-white text-zinc-900 rounded-2xl shadow-2xl p-8 sm:p-10">
            <h1 className="text-3xl font-bold mb-2 text-zinc-900">
              ¡Bienvenido de nuevo!
            </h1>
            <p className="text-zinc-500 mb-6 text-sm">
              Iniciá sesión para continuar con tu entrenamiento.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* CONTRASEÑA */}
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="text-right">
                <Link
                  to="/forgot"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* BOTÓN LOGIN */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Iniciar sesión
              </button>
            </form>

            {/* DIVISOR */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-zinc-300" />
              <span className="px-3 text-zinc-500 text-sm">O continúa con</span>
              <hr className="flex-grow border-zinc-300" />
            </div>

            {/* LOGIN GOOGLE */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-zinc-300 rounded-lg py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
            >
              <FaGoogle className="text-red-500 h-5 w-5" />
              Google
            </button>

            <p className="text-center text-sm text-zinc-600 mt-6">
              ¿No tenés cuenta?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Registrate ahora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
