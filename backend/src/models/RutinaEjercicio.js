import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const RutinaEjercicio = sequelize.define("RutinaEjercicio", {
  id_rutina_ejercicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_rutina: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_ejercicio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  series: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  repeticiones: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "rutinas_ejercicios",
  timestamps: false
});

export default RutinaEjercicio;
