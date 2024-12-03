import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ventasModel = db.define('ventas', {
    id_usuario: { type: DataTypes.INTEGER, allowNull: true },
    id_cliente: { type: DataTypes.INTEGER, allowNull: true },
    total: { type: DataTypes.DECIMAL(10, 2) },
    metodo_pago: { 
        type: DataTypes.ENUM('Efectivo', 'Tarjeta', 'Yape', 'Plin'),
        allowNull: false
    },
    imagen_evidencia: { type: DataTypes.BLOB, allowNull: true },
    numero_operacion: { type: DataTypes.STRING, allowNull: true },
    tipo_comprobante: { 
        type: DataTypes.ENUM('Boleta', 'Factura'),
        allowNull: false
    },
    fecha_emision: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW
    },
    estado: { 
        type: DataTypes.ENUM('Emitido', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Emitido'
    }
}, {
    timestamps: false
});

export default ventasModel;