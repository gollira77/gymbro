import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { Usuario } from "../models/index.js";
import { sendEmail } from "../utils/emailHelper.js";
dotenv.config();

export const registerUser = async ({ email, password, id_rol }) => {
  const existente = await Usuario.findOne({ where: { email } });
  if (existente) throw new Error("El correo electrónico ya está registrado");

  const hashed = await bcrypt.hash(password, 10);
  const nuevoUsuario = await Usuario.create({
    email,
    password: hashed,
    id_rol,
    activo: true,
  });

  return { id_usuario: nuevoUsuario.id_usuario, email: nuevoUsuario.email };
};

export const loginUser = async ({ email, password }) => {
  const user = await Usuario.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");
  if (!user.activo) throw new Error("El usuario no está activo");

  const esValido = await bcrypt.compare(password, user.password);
  if (!esValido) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    {
      id_usuario: user.id_usuario,
      email: user.email,
      id_rol: user.id_rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "30d" }
  );

  return { token, usuario: { id_usuario: user.id_usuario, email: user.email, id_rol: user.id_rol } };
};

export const forgotPassword = async ({ email }) => {
  const user = await Usuario.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");

  const token = crypto.randomBytes(32).toString("hex");
  const fechaExpiracion = new Date(Date.now() + 3600000); // 1 hora

  await user.update({ token_recuperacion: token, fecha_expiracion_token: fechaExpiracion });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  await sendEmail({
    to: email,
    subject: "Recuperación de contraseña - GymBro",
    html: `<p>Has solicitado restablecer tu contraseña.</p>
           <p>Haz clic en el siguiente enlace para continuar:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>Este enlace expirará en 1 hora.</p>`,
  });

  return { message: "Correo de recuperación enviado" };
};

export const resetPassword = async ({ token, password }) => {
  const user = await Usuario.findOne({ where: { token_recuperacion: token } });
  if (!user) throw new Error("Token inválido");
  if (new Date() > new Date(user.fecha_expiracion_token)) throw new Error("El token ha expirado");

  const hashed = await bcrypt.hash(password, 10);
  await user.update({
    password: hashed,
    token_recuperacion: null,
    fecha_expiracion_token: null,
  });

  return { message: "Contraseña actualizada correctamente" };
};
