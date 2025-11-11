import { Notificacion, TipoNotificacion, Usuario } from "../models/index.js";

export const obtenerNotificacionesCliente = async (req, res) => {
  try {
    const { id } = req.params; // id_usuario

    // ✅ Verificar si el usuario existe
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // ✅ Buscar todas las notificaciones asociadas al usuario
    const notificaciones = await Notificacion.findAll({
      where: { id_usuario: id },
      include: [
        {
          model: TipoNotificacion,
          as: "tipoNotificacion",
          attributes: ["nom_noti", "descrip_noti"],
        },
      ],
      order: [["fecha_envio", "DESC"]],
    });

    if (!notificaciones.length) {
      return res.json({
        success: true,
        message: "No hay notificaciones para este usuario",
        data: [],
      });
    }

    // ✅ Formatear la salida para el frontend
    const resultado = notificaciones.map((n) => ({
      id_notificacion: n.id_notificacion,
      tipo: n.tipoNotificacion.nom_noti,
      descripcion: n.tipoNotificacion.descrip_noti,
      mensaje: n.mensaje_noti,
      leido: n.leido,
      fecha_envio: n.fecha_envio,
    }));

    return res.json({
      success: true,
      message: "Notificaciones obtenidas correctamente",
      total: resultado.length,
      data: resultado,
    });
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener notificaciones",
      error: error.message,
    });
  }
};
