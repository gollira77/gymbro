import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorResponse } from "../utils/responseHelper.js";

dotenv.config();

/**
 * Middleware para verificar JWT y rol de cliente
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "No se proporcionó un token válido", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    // Decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Opcional: validar rol cliente
    // si tu payload tiene id_rol
    if (decoded.id_rol !== 1) { // Asumimos que id_rol=4 es cliente
      return errorResponse(res, "No autorizado: solo clientes", 403);
    }

    next();
  } catch (err) {
    return errorResponse(res, "Token inválido o expirado", 401);
  }
};
