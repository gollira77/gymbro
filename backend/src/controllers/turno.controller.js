import { Turno, RutinaCliente, HorarioEntrenador, Entrenador, Cliente, Rutina } from "../models/index.js";
import { Op } from "sequelize";

export const crearTurno = async (req, res) => {
  try {
    const { id } = req.params; // id del cliente
    const { id_rutina_cliente, fecha } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) return res.status(404).json({ success: false, message: "Cliente no encontrado" });

    // Obtener la asignación y su entrenador
    const asignacion = await RutinaCliente.findOne({
      where: { id_rutina_cliente, id_cliente: id },
      include: [
        {
          model: Rutina,
          as: "rutina",
          include: [
            {
              model: Entrenador,
              as: "entrenador"
            }
          ]
        }
      ]
    });

    if (!asignacion) {
      return res.status(400).json({ success: false, message: "No existe una rutina asignada a este cliente." });
    }

    const entrenador = asignacion.rutina.entrenador;

    const dateObj = new Date(fecha);
    const diaSemana = dateObj.toLocaleString("es-ES", { weekday: "long" }).toUpperCase();

    const horarioDisponible = await HorarioEntrenador.findOne({
      where: {
        id_entrenador: entrenador.id_entrenador,
        dia_semana: {
          [Op.like]: `%${diaSemana.slice(0, 1).toUpperCase()}${diaSemana.slice(1).toLowerCase()}%`
        }
      }
    });


    if (!horarioDisponible) {
      return res.status(400).json({
        success: false,
        message: "El entrenador no trabaja ese día"
      });
    }

    const horaTurno = dateObj.toTimeString().slice(0, 8);

    if (horaTurno < horarioDisponible.hora_inicio || horaTurno > horarioDisponible.hora_fin) {
      return res.status(400).json({
        success: false,
        message: "El horario está fuera del rango permitido del entrenador"
      });
    }

    const existeTurno = await Turno.findOne({
      where: {
        id_cliente: id,
        fecha: {
          [Op.eq]: fecha
        }
      }
    });

    if (existeTurno) {
      return res.status(400).json({ success: false, message: "Ese turno ya está reservado" });
    }

    const turno = await Turno.create({
      id_cliente: id,
      id_rutina_cliente,
      fecha,
      estado: "Pendiente"
    });

    return res.status(201).json({ success: true, turno });

  } catch (error) {
    console.error("Error creando turno:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const obtenerTurnosCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const turnos = await Turno.findAll({
      where: { id_cliente: id }
    });

    return res.json({ success: true, turnos });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error obteniendo turnos", error: error.message });
  }
};


export const actualizarTurno = async (req, res) => {
  try {
    const { id, idTurno } = req.params;
    const { fecha, estado } = req.body;

    const turno = await Turno.findOne({
      where: { id_turno: idTurno, id_cliente: id }
    });

    if (!turno) return res.status(404).json({ success: false, message: "Turno no encontrado" });

    if (fecha) turno.fecha = fecha;
    if (estado) turno.estado = estado;

    await turno.save();

    return res.json({ success: true, turno });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error actualizando turno", error: error.message });
  }
};
