import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Turno = sequelize.define("Turno", {
  id_turno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_rutina_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "turnos",
  timestamps: false
});

export default Turno;
