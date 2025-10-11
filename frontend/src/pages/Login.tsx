import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { login } from "../services/authService";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(email, password);

    setMessage(res.message);
    setErrors(res.errors || []);

    if (res.success) {
      if (res.token) localStorage.setItem("token", res.token);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-100 justify-between">
      <div className="">
        <form onSubmit={handleSubmit} className="p-6 w-96">
          <div className="my-6">
            <PageHeader title="Iniciar sesion" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            ¡Bienvenido de nuevo! Estamos encantados de verte de nuevo
          </h2>

          <Input
            label="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right mb-2">
            <Link
              to="/forgot"
              className="text-sm text-blue-500 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg mt-2"
          >
            Iniciar sesion
          </button>

          {message && <p className="mt-2 text-center text-sm">{message}</p>}
          {errors.length > 0 && (
            <ul className="mt-2 text-red-500 text-sm list-disc list-inside">
              {errors.map((err, i) => (
                <li key={i}>{err.msg}</li>
              ))}
            </ul>
          )}

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">
              O inicia sesion con
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button type="button" className="p-3 rounded-full">
              <FaFacebook size={20} className="text-blue-600" />
            </button>
            <button type="button" className="p-3 rounded-full">
              <FaGoogle size={20} className="text-red-500" />
            </button>
            <button type="button" className="p-3 rounded-full">
              <FaApple size={20} />
            </button>
          </div>
        </form>
      </div>
      <div className="p-6">
        <p className="mt-3 text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrate ahora
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
