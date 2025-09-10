import { Router } from "express"
import authController from "../controllers/authController.js"
import {registerValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation,
} from "../middlewares/validators/authValidator.js"
import { validateRequest } from "../middlewares/validateRequest.js"

const router = Router()

router.post("/register", registerValidation, validateRequest, authController.register.bind(authController))
router.post("/login", loginValidation, validateRequest, authController.login.bind(authController))
router.post("/forgot-password", forgotPasswordValidation, validateRequest, authController.forgotPassword.bind(authController))
router.post("/reset-password", resetPasswordValidation, validateRequest, authController.resetPassword.bind(authController))

export default router
