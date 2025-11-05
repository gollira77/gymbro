import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función genérica para enviar correos
export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"GymBro" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error enviando correo:", error);
    return false;
  }
};

// Función específica para enviar el correo de recuperación de contraseña
export const sendPasswordResetEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"GymBro" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};