// src/models/Resena.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Resena = sequelize.define(
  "Resena",
  {
    id_resena: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mensaje_resena: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    fecha_mensaje: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "resenas",
    timestamps: false,
  }
);

export default Resena;
