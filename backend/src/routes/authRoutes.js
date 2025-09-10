import { Router } from "express"
import { register, login, forgotPassword, resetPassword } from "../controllers/authController.js"
import { registerValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation } from "../middlewares/validators/authValidator.js"
import { validateRequest } from "../middlewares/validateRequest.js"

const router = Router()

router.post("/register", registerValidation, validateRequest, register)
router.post("/login", loginValidation, validateRequest, login)
router.post("/forgot-password", forgotPasswordValidation, validateRequest, forgotPassword)
router.post("/reset-password", resetPasswordValidation, validateRequest, resetPassword)

export default router
