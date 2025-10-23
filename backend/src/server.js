// src/server.js
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { sequelize } from "./models/index.js"; 
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", routes);

// Health check simple
app.get("/health", (req, res) => res.json({ success: true, message: "Servidor activo" }));

// Handler de errores básico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "algo salió mal" });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la BD");

    await sequelize.sync({ alter: true, logging: false });
    console.log("Modelos sincronizados con la BD");

    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (err) {
    console.error("No se pudo conectar a la BD:", err);
    process.exit(1);
  }
};

start();
