import express from "express"
const router = express.Router()

// Importar rutas específicas
import authRoutes from "./authRoutes.js"

// Configurar rutas
router.use("/auth", authRoutes)

export default router