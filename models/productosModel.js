import db from "../database/db.js";
import { DataTypes } from "sequelize";


const productosModel = db.define('productos', {
    nombre_producto: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    id_categoria: { type: DataTypes.INTEGER, allowNull: false },
    precio_compra: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    precio_venta: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    fecha_vencimiento: { type: DataTypes.DATE, allowNull: true },
    imagen: { type: DataTypes.TEXT, allowNull: true },
    estado: { type: DataTypes.STRING, defaultValue: 'Inactivo' }
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default productosModel;