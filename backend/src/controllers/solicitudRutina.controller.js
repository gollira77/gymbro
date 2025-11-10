import SolicitudRutina from "../models/SolicitudRutina.js";
import EstadoSolicitud from "../models/EstadoSolicitud.js";

export const crearSolicitudRutina = async (req, res) => {
  try {
    const id_cliente = req.params.id;
    const { objetivo, observaciones } = req.body;

    if (!objetivo) {
      return res.status(400).json({
        success: false,
        message: "El objetivo es obligatorio"
      });
    }

    // Estado inicial = pendiente (1)
    const nuevaSolicitud = await SolicitudRutina.create({
      id_cliente,
      id_rutina: null,
      id_estado_soli: 1, // pendiente
      observaciones: observaciones || objetivo
    });

    return res.status(201).json({
      success: true,
      message: "Solicitud enviada correctamente",
      data: nuevaSolicitud
    });
  } catch (error) {
    console.error("Error creando solicitud:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

export const obtenerSolicitudesRutina = async (req, res) => {
  try {
    const id_cliente = req.params.id;

    const solicitudes = await SolicitudRutina.findAll({
      where: { id_cliente },
      include: [
        {
          model: EstadoSolicitud,
          as: "estado",
          attributes: ["nom_soli", "descrip_soli"]
        }
      ],
      order: [["fecha_solicitud", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      message: "Solicitudes encontradas",
      data: solicitudes
    });
  } catch (error) {
    console.error("Error obteniendo solicitudes:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message
    });
  }
};
