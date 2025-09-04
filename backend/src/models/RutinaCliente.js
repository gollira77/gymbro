import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const RutinaCliente = sequelize.define("RutinaCliente", {
  id_rutina_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_rutina: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_asignacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  completada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descanso: {
    type: DataTypes.STRING, 
    allowNull: true
  }
}, {
  tableName: "rutinas_clientes",
  timestamps: false
});

export default RutinaCliente;
