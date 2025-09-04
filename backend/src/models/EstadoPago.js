import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const EstadoPago = sequelize.define("EstadoPago", {
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_pago: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descrip_pago: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "estados_pagos",
  timestamps: false
});

export default EstadoPago;
