import express from "express"
const router = express.Router()

import authRoutes from "./authRoutes.js"
import adminRoutes from "./adminRoutes.js"
import clienteRoutes from "./clienteRoutes.js"
import entrenadorRoutes from "./entrenadorRoutes.js"
import perfilRoutes from "./perfilRoutes.js"

router.use("/auth", authRoutes)
router.use("/admin", adminRoutes)
router.use("/clientes", clienteRoutes)
router.use("/entrenadores", entrenadorRoutes)
router.use("/", perfilRoutes) 
export default router
