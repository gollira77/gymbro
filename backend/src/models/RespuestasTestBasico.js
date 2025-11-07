import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";

const RespuestasTestBasico = sequelize.define(
  "respuestas_test_basicos",
  {
    id_respuesta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experiencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    objetivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechas: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    tableName: "respuestas_test_basicos",
    timestamps: false,
  }
);

export default RespuestasTestBasico;
