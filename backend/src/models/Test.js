import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import TipoTest from "./TipoTest.js";
import Usuario from "./Usuario.js"; // si se llama Cliente.js, cámbialo

const Test = sequelize.define("Test", {
  id_test: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tipo_test: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  resul_test: {
    type: DataTypes.JSON, // permite guardar JSON completo
    allowNull: false,
  },
  fecha_realizado: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "tests",
  timestamps: false,
});

export default Test;
