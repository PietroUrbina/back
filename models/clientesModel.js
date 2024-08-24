// usuariosModel.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const clientesModel = db.define('cliente', {
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    dni: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING },
    fecha_nacimiento: { type: DataTypes.DATE }
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default clientesModel;

