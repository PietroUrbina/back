import db from "../database/db.js";
import { DataTypes } from "sequelize";

const clientesModel = db.define('clientes', {
    id_empresa: { 
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    tipo_cliente: { 
        type: DataTypes.ENUM('Cliente','Empresa'),
    },
    dni: { 
        type: DataTypes.STRING,
        allowNull: true  
    },
    nombre_completo: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    direccion: { 
        type: DataTypes.TEXT,
        allowNull: true
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: true  
    },
    telefono: { 
        type: DataTypes.STRING,
        allowNull: true 
    },    
}, {
    timestamps: false  // Deshabilitar createdAt y updatedAt
});

export default clientesModel;