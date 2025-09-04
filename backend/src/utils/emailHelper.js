/**
 * Helper para envío de correos electrónicos
 */

import nodemailer from "nodemailer"
import { logger } from "./logger.js"

// Configurar transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

/**
 * Enviar email
 */
export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `GymBro <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    }

    const info = await transporter.sendMail(mailOptions)
    logger.info(`Email enviado: ${info.messageId}`)

    return info
  } catch (error) {
    logger.error("Error enviando email:", error)
    throw error
  }
}

/**
 * Plantillas de email predefinidas
 */
export const emailTemplates = {
  welcome: (nombre) => ({
    subject: "Bienvenido a GymBro",
    html: `
      <h2>¡Bienvenido a GymBro, ${nombre}!</h2>
      <p>Tu cuenta ha sido creada exitosamente.</p>
      <p>Ahora puedes acceder a todas nuestras funcionalidades.</p>
    `,
  }),

  paymentReminder: (nombre, monto) => ({
    subject: "Recordatorio de pago - GymBro",
    html: `
      <h2>Recordatorio de pago</h2>
      <p>Hola ${nombre},</p>
      <p>Te recordamos que tienes un pago pendiente de $${monto}.</p>
      <p>Por favor, realiza tu pago para continuar disfrutando de nuestros servicios.</p>
    `,
  }),

  routineAssigned: (nombre, rutina) => ({
    subject: "Nueva rutina asignada - GymBro",
    html: `
      <h2>Nueva rutina asignada</h2>
      <p>Hola ${nombre},</p>
      <p>Se te ha asignado una nueva rutina: <strong>${rutina}</strong></p>
      <p>Revisa tu panel de cliente para ver los detalles.</p>
    `,
  }),
}
