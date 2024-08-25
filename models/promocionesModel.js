import db from "../database/db.js";
import { DataTypes } from "sequelize";

const promocionesModel = db.define('promociones', {
    nombre_promocion: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    fecha_inicio: { type: DataTypes.DATE },
    fecha_fin: { type: DataTypes.DATE },
    descuento: { type: DataTypes.DECIMAL(5,2) } // Define el campo como DECIMAL(5,2)
    
}, {
    timestamps: false  // Deshabilitar createdAt y updatedAt
});

export default promocionesModel;
