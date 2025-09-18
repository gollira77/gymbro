// routes/perfilRoutes.js
import { Router } from "express"
import perfilController from "../controllers/perfilController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js" // asegura JWT válido

const router = Router()

// Crear o actualizar perfil
router.post("/", authMiddleware, perfilController.createOrUpdate.bind(perfilController))

export default router
