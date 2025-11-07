import RespuestasTestBasico from "../models/RespuestasTestBasico.js";

export const responderTestBasico = async (req, res) => {
  try {
    const id_cliente = req.params.id;
    const { genero, edad, experiencia, objetivo, fechas, peso } = req.body;

    if (!id_cliente) {
      return res.status(400).json({
        success: false,
        message: "El id_cliente es obligatorio",
      });
    }

    const existente = await RespuestasTestBasico.findOne({
      where: { id_cliente },
    });

    if (existente) {
      await existente.update({
        genero,
        edad,
        experiencia,
        objetivo,
        fechas,
        peso,
      });

      return res.status(200).json({
        success: true,
        message: "Test actualizado correctamente",
        data: existente,
      });
    }

    const nuevo = await RespuestasTestBasico.create({
      id_cliente,
      genero,
      edad,
      experiencia,
      objetivo,
      fechas,
      peso,
    });

    return res.status(201).json({
      success: true,
      message: "Test guardado correctamente",
      data: nuevo,
    });
  } catch (error) {
    console.error("Error guardando test:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
