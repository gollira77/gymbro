import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TipoTest = sequelize.define("TipoTest", {
  id_tipo_test: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100), // básico / medio / avanzado
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: "tipos_test",
  timestamps: false,
});

export default TipoTest;
