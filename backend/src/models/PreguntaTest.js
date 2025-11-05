// src/models/PreguntaTest.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const PreguntaTest = sequelize.define("PreguntaTest", {
  id_pregunta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_tipo_test: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  opciones: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: "preguntas_tests",
  timestamps: false,
});

export default PreguntaTest;
