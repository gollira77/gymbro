import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const HorarioEntrenador = sequelize.define("HorarioEntrenador", {
  id_horario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_entrenador: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dia_semana: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: "horarios_entrenadores",
  timestamps: false
});

export default HorarioEntrenador;
