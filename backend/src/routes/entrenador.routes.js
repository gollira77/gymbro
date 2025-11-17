import express from "express";
import { obtenerRutinasEntrenador, 
        asignarRutinaACliente, 
        crearRutina, 
        agregarEjercicioARutina, 
        eliminarEjercicioDeRutina,
        verSolicitudesRutinas,
        responderSolicitudRutina  } from "../controllers/entrenador.controller.js";
import {obtenerHorariosEntrenador, crearHorarioEntrenador, actualizarHorarioEntrenador, eliminarHorarioEntrenador} from "../controllers/horarios.controller.js";

const router = express.Router();

router.get("/:id/rutinas", obtenerRutinasEntrenador);
router.get("/:id/solicitudes-rutinas", verSolicitudesRutinas);
router.get("/:id/horarios", obtenerHorariosEntrenador);

router.post("/:id/asignar-rutina", asignarRutinaACliente);
router.post("/:id/rutinas", crearRutina);
router.post("/:id/rutinas/:idRutina/ejercicios", agregarEjercicioARutina);
router.post("/:id/horarios", crearHorarioEntrenador);

router.delete("/:id/rutinas/:idRutina/ejercicios/:idEjercicio", eliminarEjercicioDeRutina);
router.delete("/:id/horarios/:idHorario", eliminarHorarioEntrenador);

router.patch("/:id/solicitudes-rutinas/:idSolicitud", responderSolicitudRutina)
router.patch("/:id/horarios/:idHorario", actualizarHorarioEntrenador);

export default router;
