import express from "express";
import { obtenerRutinasEntrenador, 
        asignarRutinaACliente, 
        crearRutina, 
        agregarEjercicioARutina, 
        eliminarEjercicioDeRutina,
        verSolicitudesRutinas  } from "../controllers/entrenador.controller.js";

const router = express.Router();

router.get("/:id/rutinas", obtenerRutinasEntrenador);
router.get("/:id/solicitudes-rutinas", verSolicitudesRutinas);

router.post("/:id/asignar-rutina", asignarRutinaACliente);
router.post("/:id/rutinas", crearRutina);
router.post("/:id/rutinas/:idRutina/ejercicios", agregarEjercicioARutina);

router.delete("/:id/rutinas/:idRutina/ejercicios/:idEjercicio", eliminarEjercicioDeRutina);

export default router;
