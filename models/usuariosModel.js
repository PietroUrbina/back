import db from "../database/db.js";
import { DataTypes } from "sequelize";
import empleadosModel from "./empleadosModel.js"

const usuariosModel = db.define('usuarios', {
    id_empleado: { type: DataTypes.INTEGER, allowNull: true }, 
    nombre_usuario: { type: DataTypes.STRING },
    contrasena: { type: DataTypes.STRING },
    rol: { 
        type: DataTypes.ENUM('Administrador',  'Cajero', 'Mozo'),
        allowNull: false  // Asegura que siempre se registre un valor
    }   
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default usuariosModel;