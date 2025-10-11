import { Router } from "express";
import { register, login, forgot, reset } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/authValidation.js";

const router = Router();

// Registro
router.post("/register", validateRequest(registerSchema), register);

// Login
router.post("/login", validateRequest(loginSchema), login);

// Recuperar contraseña
router.post("/forgot-password", validateRequest(forgotPasswordSchema), forgot);

// Restablecer contraseña
router.post("/reset-password", validateRequest(resetPasswordSchema), reset);

export default router;
