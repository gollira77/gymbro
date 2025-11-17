import express from "express"
import {
  crearCliente,
  listarClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
  obtenerRutinasAsignadas,
  marcarRutina,
  realizarTestBasico
} from "../controllers/cliente.controller.js"
import { responderTestBasico } from "../controllers/test.controller.js";
import { crearSolicitudRutina, obtenerSolicitudesRutina } from "../controllers/solicitudRutina.controller.js";
import { crearResena, obtenerResenas } from "../controllers/resena.controller.js";
import { crearTurno, obtenerTurnosCliente, actualizarTurno } from "../controllers/turno.controller.js";
import { obtenerNotificacionesCliente } from "../controllers/notificacion.controller.js";

const router = express.Router()

router.post("/", crearCliente);
router.post("/test/basico"), realizarTestBasico;
router.post("/:id/responder-test-basico", responderTestBasico);
router.post("/:id/solicitudes-rutinas", crearSolicitudRutina);
router.post("/:id/resenas", crearResena);
router.post("/:id/turnos", crearTurno);

router.get("/", listarClientes);
router.get("/:id", obtenerClientePorId);
router.get("/:id/rutinas", obtenerRutinasAsignadas);
router.get("/:id/solicitudes-rutinas", obtenerSolicitudesRutina);
router.get("/resenas/all", obtenerResenas);
router.get("/:id/turnos", obtenerTurnosCliente);
router.get("/:id/notificaciones", obtenerNotificacionesCliente);

router.put("/:id", actualizarCliente);

router.delete("/:id", eliminarCliente);

router.patch("/rutina/estado", marcarRutina);
router.patch("/:id/turnos/:idTurno", actualizarTurno);


export default router
