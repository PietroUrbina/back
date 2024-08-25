import db from "../database/db.js";
import { DataTypes } from "sequelize";

const productosModel = db.define('productos', {
    nombre: { type: DataTypes.STRING },
    precio: { type: DataTypes.INTEGER },
    stock: { type: DataTypes.DECIMAL(10,2) },
    fecha_vencimiento: { type: DataTypes.DATE }
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default productosModel;

