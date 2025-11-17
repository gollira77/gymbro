import { HorarioEntrenador, Entrenador } from "../models/index.js";
import { Op } from "sequelize";


export const obtenerHorariosEntrenador = async (req, res) => {
  try {
    const { id } = req.params;

    const entrenador = await Entrenador.findByPk(id);
    if (!entrenador)
      return res.status(404).json({ success: false, message: "Entrenador no encontrado" });

    const horarios = await HorarioEntrenador.findAll({
      where: { id_entrenador: id },
      order: [
        ["dia_semana", "ASC"],
        ["hora_inicio", "ASC"]
      ]
    });

    if (!horarios.length)
      return res.json({ success: true, message: "No hay horarios configurados", data: [] });

    return res.json({
      success: true,
      message: "Horarios obtenidos correctamente",
      data: horarios
    });
  } catch (error) {
    console.error("Error al obtener horarios:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener horarios",
      error: error.message
    });
  }
};

export const crearHorarioEntrenador = async (req, res) => {
  try {
    const { id } = req.params;
    const { dia_semana, hora_inicio, hora_fin } = req.body;

    const entrenador = await Entrenador.findByPk(id);
    if (!entrenador)
      return res.status(404).json({ success: false, message: "Entrenador no encontrado" });

    if (!dia_semana || !hora_inicio || !hora_fin)
      return res.status(400).json({ success: false, message: "Faltan campos obligatorios" });

    if (hora_inicio >= hora_fin)
      return res.status(400).json({ success: false, message: "El horario de inicio debe ser menor al de fin" });

    const conflicto = await HorarioEntrenador.findOne({
      where: {
        id_entrenador: id,
        dia_semana,
        hora_inicio: { [Op.lt]: hora_fin },
        hora_fin: { [Op.gt]: hora_inicio }
      }
    });

    if (conflicto)
      return res.status(400).json({ success: false, message: "Ya existe un horario que se superpone con este rango" });

    const nuevoHorario = await HorarioEntrenador.create({
      id_entrenador: id,
      dia_semana,
      hora_inicio,
      hora_fin
    });

    return res.status(201).json({
      success: true,
      message: "Horario creado correctamente",
      data: nuevoHorario
    });
  } catch (error) {
    console.error("Error al crear horario:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear horario",
      error: error.message
    });
  }
};

export const actualizarHorarioEntrenador = async (req, res) => {
  try {
    const { id, idHorario } = req.params;
    const { dia_semana, hora_inicio, hora_fin } = req.body;

    const horario = await HorarioEntrenador.findOne({
      where: { id_horario: idHorario, id_entrenador: id }
    });

    if (!horario)
      return res.status(404).json({ success: false, message: "Horario no encontrado" });

    if (hora_inicio && hora_fin && hora_inicio >= hora_fin)
      return res.status(400).json({ success: false, message: "El horario de inicio debe ser menor al de fin" });

    if (dia_semana || hora_inicio || hora_fin) {
      const conflicto = await HorarioEntrenador.findOne({
        where: {
          id_entrenador: id,
          dia_semana: dia_semana || horario.dia_semana,
          id_horario: { [Op.ne]: idHorario },
          hora_inicio: { [Op.lt]: hora_fin || horario.hora_fin },
          hora_fin: { [Op.gt]: hora_inicio || horario.hora_inicio }
        }
      });
      if (conflicto)
        return res.status(400).json({ success: false, message: "El nuevo horario se superpone con otro existente" });
    }

    await horario.update({ dia_semana, hora_inicio, hora_fin });

    return res.json({
      success: true,
      message: "Horario actualizado correctamente",
      data: horario
    });
  } catch (error) {
    console.error("Error al actualizar horario:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar horario",
      error: error.message
    });
  }
};

export const eliminarHorarioEntrenador = async (req, res) => {
  try {
    const { id, idHorario } = req.params;

    const horario = await HorarioEntrenador.findOne({
      where: { id_horario: idHorario, id_entrenador: id }
    });

    if (!horario)
      return res.status(404).json({ success: false, message: "Horario no encontrado" });

    await horario.destroy();

    return res.json({
      success: true,
      message: "Horario eliminado correctamente"
    });
  } catch (error) {
    console.error("Error al eliminar horario:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar horario",
      error: error.message
    });
  }
};
