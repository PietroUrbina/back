import db from "../database/db.js";
import { DataTypes } from "sequelize";
import productosModel from "./productosModel.js";

const inventariosModel = db.define('inventarios', {
    id_producto: { type: DataTypes.INTEGER },
    stock: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.DECIMAL },
    unidad_medida: { type: DataTypes.STRING },
    tipo_movimiento: { 
        type: DataTypes.ENUM('Entrada', 'Salida'),
        allowNull: false  // Asegura que siempre se registre un valor
    },
    fecha_movimiento: {
        type: DataTypes.DATE,
        allowNull: false  // Puedes forzar que este campo no sea nulo
    }
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

// Establecer relación con Productos
inventariosModel.belongsTo(productosModel, { foreignKey: 'id_producto' });

export default inventariosModel;
