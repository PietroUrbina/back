import db from "../database/db.js";
import { DataTypes } from "sequelize";

const unidadMedidaModel = db.define('unidad_medidas', {
    nombre_unidad: { type: DataTypes.STRING, allowNull: false }, 
    factor_conversion: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    descripcion: { type: DataTypes.STRING } 
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default unidadMedidaModel;