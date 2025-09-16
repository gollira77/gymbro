import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { register } from "../services/authService";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idRol, setIdRol] = useState(2); // por defecto cliente
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await register(email, password, idRol, {
      nombre,
      apellido,
      dni,
    });

    setMessage(res.message);
    setErrors(res.errors || []);

    if (res.success) {
      if (res.token) localStorage.setItem("token", res.token);
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col bg-zinc-100 justify-between">
      <div>
        <form
          onSubmit={handleSubmit}
          className="p-6 w-96 mx-auto"
        >
          <div className="my-6">
            <FaAngleLeft className="text-3xl" />
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center">
            ¡Crea tu cuenta y comienza tu entrenamiento!
          </h2>

          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Rol</label>
            <select
              value={idRol}
              onChange={(e) => setIdRol(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            >
              <option value={2}>Cliente</option>
              <option value={3}>Entrenador</option>
            </select>
          </div>

          <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <Input label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          <Input label="DNI" value={dni} onChange={(e) => setDni(e.target.value)} />

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg mt-2"
          >
            Registrarse
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
              O inicia sesión con
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
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
