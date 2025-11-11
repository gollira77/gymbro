import { transporter } from "../config/email.js";

/**
 * Envía un correo electrónico usando Nodemailer.
 * @param {string} destinatario - Dirección del correo destino.
 * @param {string} asunto - Asunto del correo.
 * @param {string} mensaje - Contenido del correo (texto o HTML).
 */
export const enviarCorreo = async (destinatario, asunto, mensaje) => {
  try {
    await transporter.sendMail({
      from: `"GymBro Fitness" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: asunto,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color:#2E86C1;">${asunto}</h2>
          <p>${mensaje}</p>
          <hr>
          <p style="font-size: 0.9rem; color: gray;">Este mensaje fue generado automáticamente por el sistema GymBro. No respondas a este correo.</p>
        </div>
      `,
    });

    console.log(`📧 Correo enviado correctamente a ${destinatario}`);
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    throw new Error("No se pudo enviar el correo al cliente.");
  }
};
