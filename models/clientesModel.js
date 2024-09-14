import db from "../database/db.js";
import { DataTypes } from "sequelize";

const clientesModel = db.define('cliente', {
    dni: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    fecha_nacimiento: { type: DataTypes.DATE }
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default clientesModel;

