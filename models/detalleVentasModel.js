import db from "../database/db.js";
import { DataTypes } from "sequelize";

const detalleVentasModel = db.define('detalleventas', {
    id_venta: { type: DataTypes.INTEGER, allowNull: true },
    id_producto: { type: DataTypes.INTEGER, allowNull: true },
    cantidad: { type: DataTypes.INTEGER },
    subtotal: { type: DataTypes.DECIMAL(10, 2) },
    pago: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    cambio: { type: DataTypes.DECIMAL(10, 2), allowNull: true }
}, {
    timestamps: false
});

export default detalleVentasModel;