import {registerUser, loginUser, forgotPassword, resetPassword} from "../services/authService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";
import { transporter } from "../config/email.js";
import { Usuario } from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    return successResponse(res, result, "Usuario registrado correctamente", 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return successResponse(res, result, "Inicio de sesión exitoso");
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const forgot = async (req, res) => {
  try {
    const result = await forgotPassword(req.body);
    return successResponse(res, result, "Correo de recuperación enviado");
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const reset = async (req, res) => {
  try {
    const result = await resetPassword(req.body);
    return successResponse(res, result, "Contraseña restablecida correctamente");
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Logout simple
export const logout = async (req, res) => {
  try {
    // EZEQUIEL elimina el token desde el frontend nomas del localStorage o cookies, aquí solo devuelvo confirmación
    return successResponse(res, {}, "Sesión cerrada correctamente");
  } catch (err) {
    return errorResponse(res, "Error al cerrar sesión", 500);
  }
};

export const recuperarPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    const token = uuidv4();
    const expiracion = new Date(Date.now() + 3600000); // 1 hora

    usuario.token_recuperacion = token;
    usuario.fecha_expiracion_token = expiracion;
    await usuario.save();

    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;

    await transporter.sendMail({
      from: `"GymBro" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperación de contraseña",
      html: `<p>Hola, para resetear tu contraseña, hace click <a href="${resetLink}">aquí</a>.</p>`,
    });

    res.json({ success: true, message: "Correo de recuperación enviado" });
  } catch (err) {
    console.error("Error enviando correo:", err);
    res.status(500).json({ success: false, message: "algo salió mal al enviar correo" });
  }
};