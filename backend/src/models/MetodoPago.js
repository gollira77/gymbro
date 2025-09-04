import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const MetodoPago = sequelize.define("MetodoPago", {
  id_metodo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_metodo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descrip_metodo: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "metodos_pagos",
  timestamps: false
});

export default MetodoPago;
