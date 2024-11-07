import db from "../database/db.js";
import { DataTypes } from "sequelize";

const detalleVentasModel = db.define('detalleventas', {
    id_venta: { type: DataTypes.INTEGER, allowNull: false },
    id_producto: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    timestamps: false
});

export default detalleVentasModel;
