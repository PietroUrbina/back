import db from "../database/db.js";
import { DataTypes } from "sequelize";
import empleadosModel from "./empleadosModel.js"

const usuariosModel = db.define('usuarios', {
    nombre_usuario: { type: DataTypes.STRING },
    contrasena: { type: DataTypes.STRING },
    rol: { 
        type: DataTypes.ENUM('Administrador',  'Cajero', 'Mozo'),
        allowNull: false  // Asegura que siempre se registre un valor
    },
    id_empleado: { type: DataTypes.INTEGER },    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

// Establecer relación con empleados
usuariosModel.belongsTo(empleadosModel, { foreignKey: 'id_empleado' });


export default usuariosModel;

