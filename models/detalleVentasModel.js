import db from "../database/db.js";
import { DataTypes } from "sequelize";

const detalleVentasModel = db.define('detalleventas', {
    id_venta: { type: DataTypes.INTEGER },
    id_producto: { type: DataTypes.INTEGER },
    cantidad: { type: DataTypes.INTEGER },
    precio_unitario: { type: DataTypes.DECIMAL(10,2) },
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default detalleVentasModel;

