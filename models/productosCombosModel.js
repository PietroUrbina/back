import db from "../database/db.js";
import { DataTypes } from "sequelize";

const productosCombosModel = db.define('productos_combos', {
    id_producto: { type: DataTypes.INTEGER, allowNull: true }, 
    id_producto_combo: { type: DataTypes.INTEGER, allowNull: true },
    cantidad: { type: DataTypes.INTEGER, allowNull: false} 
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default productosCombosModel;