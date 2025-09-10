import { Router } from "express"
import { authorize } from "../middlewares/roleMiddleware.js"

const router = Router()

// Ruta protegida solo para roles con permiso "manage_users"
router.get("/admin-only", authorize("manage_users"), (req, res) => {
  res.json({ success: true, message: "Ruta solo para admins" })
})

export default router
