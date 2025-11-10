import express from "express";
import { obtenerRutinasEntrenador, asignarRutinaACliente, crearRutina  } from "../controllers/entrenador.controller.js";

const router = express.Router();

router.get("/:id/rutinas", obtenerRutinasEntrenador);
router.post("/:id/asignar-rutina", asignarRutinaACliente);
router.post("/:id/rutinas", crearRutina);


export default router;
