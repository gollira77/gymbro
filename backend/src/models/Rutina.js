import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Rutina = sequelize.define("Rutina", {
  id_rutina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_rutina: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descrip_rutina: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  id_entrenador: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_rut: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  duracion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "rutinas",
  timestamps: false
});

export default Rutina;
