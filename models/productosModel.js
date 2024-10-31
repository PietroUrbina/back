import db from "../database/db.js";
import { DataTypes } from "sequelize";
import categoriasModel from "./categoriasModel.js";

const productosModel = db.define('productos', {
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    id_categoria: { type: DataTypes.INTEGER },
    costo: { type: DataTypes.DECIMAL },
    fecha_vencimiento: { type: DataTypes.DATE },
    imagen: { type: DataTypes.TEXT },
    estado: { type: DataTypes.STRING, defaultValue: 'inactivo' }
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

// Establecer relación con categorías
productosModel.belongsTo(categoriasModel, { foreignKey: 'id_categoria' });

export default productosModel;
