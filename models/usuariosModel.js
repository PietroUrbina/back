// usuariosModel.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const usuariosModel = db.define('usuarios', {
    nombre_usuario: { type: DataTypes.STRING },
    contrasena: { type: DataTypes.STRING },
    rol: { 
        type: DataTypes.ENUM('administrador', 'cajero', 'mozo'),
        allowNull: false // Esto asegura que siempre se registre un valor
    },
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default usuariosModel;

