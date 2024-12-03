import db from "../database/db.js";
import { DataTypes } from "sequelize";

const promocionesModel = db.define('promociones', {
    nombre_promocion: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    descuento_porcentaje: { type: DataTypes.DECIMAL(5,2), allowNull: true },
    descuento_fijo: { type: DataTypes.DECIMAL(10,2), allowNull: true },
    fecha_inicio: { type: DataTypes.DATE },
    fecha_fin: { type: DataTypes.DATE },
    
    
}, {
    timestamps: false  // Deshabilitar createdAt y updatedAt
});

export default promocionesModel;