// src/models/TipoTest.js
import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const TipoTest = sequelize.define("TipoTest", {
  id_tipo_test: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_test: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descrip_tip_test: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "tipos_tests",
  timestamps: false,
})

export default TipoTest
