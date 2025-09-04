/**
 * Rutas principales - Agrupa todas las rutas de la aplicación
 */

import express from "express"
const router = express.Router()

// Importar rutas específicas
import authRoutes from "./authRoutes.js"
import usuarioRoutes from "./usuarioRoutes.js"
import clienteRoutes from "./clienteRoutes.js"
import entrenadorRoutes from "./entrenadorRoutes.js"
import rutinaRoutes from "./rutinaRoutes.js"
import ejercicioRoutes from "./ejercicioRoutes.js"
import pagoRoutes from "./pagoRoutes.js"
import testRoutes from "./testRoutes.js"
import resenaRoutes from "./resenaRoutes.js"
import notificacionRoutes from "./notificacionRoutes.js"
import turnoRoutes from "./turnoRoutes.js"
import sueldoRoutes from "./sueldoRoutes.js"
import estadisticaRoutes from "./estadisticaRoutes.js"

// Configurar rutas
router.use("/auth", authRoutes)
router.use("/usuarios", usuarioRoutes)
router.use("/clientes", clienteRoutes)
router.use("/entrenadores", entrenadorRoutes)
router.use("/rutinas", rutinaRoutes)
router.use("/ejercicios", ejercicioRoutes)
router.use("/pagos", pagoRoutes)
router.use("/tests", testRoutes)
router.use("/resenas", resenaRoutes)
router.use("/notificaciones", notificacionRoutes)
router.use("/turnos", turnoRoutes)
router.use("/sueldos", sueldoRoutes)
router.use("/estadisticas", estadisticaRoutes)

export default router