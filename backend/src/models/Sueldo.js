import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Sueldo = sequelize.define("Sueldo", {
  id_sueldo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_entrenador: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "sueldos",
  timestamps: false
});

export default Sueldo;
