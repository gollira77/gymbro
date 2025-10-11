import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorResponse } from "../utils/responseHelper.js";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "No se proporcionó un token válido", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, "Token inválido o expirado", 401);
  }
};