import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { Usuario, Cliente } from "../models/index.js";
import { sendPasswordResetEmail } from "../utils/emailHelper.js";
dotenv.config();

export const registerUser = async ({ email, password, id_rol, datosPersonales }) => {
  
  const existente = await Usuario.findOne({ where: { email } });
  if (existente) throw new Error("El correo electrónico ya está registrado");

  const hashed = await bcrypt.hash(password, 10);
  const nuevoUsuario = await Usuario.create({
    email,
    password: hashed,
    id_rol,
    activo: true,
  });

  let clienteCreado = null;

  if (id_rol === 1 && datosPersonales) {
    const {
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      genero,
      telefono = null,
      direccion = null,
    } = datosPersonales;

    // Buscar si ya tiene cliente asociado
    let clienteExistente = await Cliente.findOne({ where: { id_usuario: nuevoUsuario.id_usuario } });

    if (clienteExistente) {
      // Rellenar solo campos vacíos (sin borrar datos existentes)
      const camposFaltantes = {};
      for (const campo of [
        "nombre",
        "apellido",
        "dni",
        "fecha_nacimiento",
        "genero",
        "telefono",
        "direccion",
      ]) {
        if (!clienteExistente[campo] || clienteExistente[campo] === null) {
          camposFaltantes[campo] = datosPersonales[campo];
        }
      }

      if (Object.keys(camposFaltantes).length > 0) {
        await clienteExistente.update(camposFaltantes);
      }

      clienteCreado = clienteExistente;
    } else {
      // Crear cliente nuevo
      clienteCreado = await Cliente.create({
        id_usuario: nuevoUsuario.id_usuario,
        nombre,
        apellido,
        dni,
        fecha_nacimiento,
        genero,
        telefono,
        direccion,
      });
    }
  }
  
  return {
    usuario: {
      id_usuario: nuevoUsuario.id_usuario,
      email: nuevoUsuario.email,
      id_rol: nuevoUsuario.id_rol,
      activo: nuevoUsuario.activo,
    },
    datosPersonales: clienteCreado,
  };

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

  // Usamos la IP local de tu máquina y el puerto
  const resetLink = `http://10.254.198.125:3000/reset-password.html?token=${token}&email=${encodeURIComponent(email)}`;

  await sendPasswordResetEmail({
    to: email,
    subject: "Recuperación de contraseña - GymBro",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 style="color: #333;">🔒 Recuperación de Contraseña</h2>
      <p style="font-size: 16px; color: #555;">
        Recibimos una solicitud para restablecer tu contraseña.
      </p>
      <p style="font-size: 16px; color: #555;">
        Hacé clic en el siguiente botón para ir al formulario y actualizar tu contraseña:
      </p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; border-radius: 5px; text-decoration: none; font-weight: bold;">
        Restablecer contraseña
      </a>
      <p style="font-size: 14px; color: #999; margin-top: 20px;">
        — El equipo de <strong>GymBro</strong>
      </p>
    </div>`,
  });

  return { message: "Correo de recuperación enviado" };
};

export const resetPassword = async ({ token, email, password }) => {
  const usuario = await Usuario.findOne({ where: { email, token_recuperacion: token } });

  if (!usuario) throw new Error("Token inválido o usuario no encontrado");

  if (usuario.fecha_expiracion_token && new Date() > usuario.fecha_expiracion_token) {
    throw new Error("El enlace de recuperación ha expirado");
  }

  if (!password || password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await usuario.update({
    password: hashedPassword,
    token_recuperacion: null,
    fecha_expiracion_token: null,
  });

  return { message: "Contraseña restablecida correctamente" };
};

