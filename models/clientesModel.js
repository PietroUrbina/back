import db from "../database/db.js";
import { DataTypes } from "sequelize";

const clientesModel = db.define('clientes', {
    dni: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    direccion: {type: DataTypes.STRING},
    email: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    fecha_nacimiento: { type: DataTypes.DATE },
    sexo: { 
        type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
        allowNull: false  // Asegura que siempre se registre un valor
    },
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default clientesModel;

