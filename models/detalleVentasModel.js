import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ventasModel from "./ventasModel.js";
import productosModel from "./productosModel.js";

const detalleVentasModel = db.define('detalleventas', {
    id_venta: { type: DataTypes.INTEGER, allowNull: false },
    id_producto: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false } // Calculado como cantidad * precio_unitario
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

// Establecer relaciones
detalleVentasModel.belongsTo(ventasModel, { foreignKey: 'id_venta' });
detalleVentasModel.belongsTo(productosModel, { foreignKey: 'id_producto' });

export default detalleVentasModel;
