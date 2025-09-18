import { Router } from "express"
import perfilController from "../controllers/perfilController.js"
import { authenticate } from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/perfil", authenticate, perfilController.createOrUpdate.bind(perfilController))
router.get("/perfil", authenticate, perfilController.getProfile.bind(perfilController)) // ✅ GET usando controller

export default router
