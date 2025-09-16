// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth"; // ajusta a la URL de tu backend

export const register = async (
  email: string,
  password: string,
  id_rol: number,
  datosPersonales: { nombre: string; apellido: string; dni: string }
) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      email,
      password,
      id_rol,
      datosPersonales,
    });
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Error en el registro",
      errors: err.response?.data?.errors || [],
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; // { success, message, token?, usuario? }
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Error en el login",
      errors: err.response?.data?.errors || [],
    };
  }
};
