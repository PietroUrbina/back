import db from "../database/db.js";
import { DataTypes } from "sequelize";
import empleadosModel from "./empleadosModel.js"

const productosModel = db.define('productos', {
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

// Establecer relación con categorías
usuariosModel.belongsTo(empleadosModel, { foreignKey: 'id_empleado' });


export default productosModel;

