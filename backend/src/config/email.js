import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // ej: smtp.gmail.com
  port: process.env.EMAIL_PORT, // ej: 587
  secure: false, // true para puerto 465, false para 587 (TLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔧 Verifica la conexión con el servidor SMTP al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error("Error al conectar con el servidor de correo:", error);
  } else {
    console.log("Servidor de correo listo para enviar mensajes ");
  }
});

// 📬 Helper reutilizable para enviar correos
export const enviarCorreo = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: `"GymBro 🏋️" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(` Correo enviado a ${to}`);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
};
