import db from "../database/db.js";
import { DataTypes } from "sequelize";
import usuariosModel from "./usuariosModel.js";
import clientesModel from "./clientesModel.js";

const ventasModel = db.define('ventas', {
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    id_cliente: { type: DataTypes.INTEGER, allowNull: true },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    metodo_pago: { 
        type: DataTypes.ENUM('Efectivo', 'Tarjeta', 'Yape', 'Plin'),
        allowNull: false
    },
    imagen_evidencia: { type: DataTypes.BLOB, allowNull: true }, // Evidencia de pago para medios digitales
    numero_operacion: { type: DataTypes.STRING, allowNull: true }, // Número de operación para medios digitales
    fecha_emision: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    estado: { 
        type: DataTypes.ENUM('Emitido', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Emitido'
    },
    tipo_comprobante: { 
        type: DataTypes.ENUM('Boleta', 'Factura'),
        allowNull: false
    }
}, {
    timestamps: false
});

// Establecer relaciones
ventasModel.belongsTo(usuariosModel, { foreignKey: 'id_usuario' });
ventasModel.belongsTo(clientesModel, { foreignKey: 'id_cliente' });

export default ventasModel;
