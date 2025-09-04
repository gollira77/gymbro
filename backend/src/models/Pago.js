import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Pago = sequelize.define("Pago", {
  id_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_metodo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false
  },
  registrado_por: {
    type: DataTypes.STRING,
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "pagos",
  timestamps: false
});

export default Pago;
