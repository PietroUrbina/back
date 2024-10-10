import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ventasModel = db.define('ventas', {
    id_usuario: { type: DataTypes.INTEGER},
    id_cliente: { type: DataTypes.INTEGER },
    total: { type: DataTypes.DECIMAL(10,2) },

    metodo_pago: { 
        type: DataTypes.ENUM('efectivo', 'tarjeta', 'yape', 'plin'),
        allowNull: false  // Asegura que siempre se registre un valor
    },
    comprobante: { type: DataTypes.STRING},

    tipo_comprobante: { 

        type: DataTypes.ENUM('Boleta', 'Factura'),
        allowNull: false  // Asegura que siempre se registre un valor
    },

    fecha_emison: { type: DataTypes.DATE },

    estado: { 
        type: DataTypes.ENUM('Emitido', 'Cancelado'),
        allowNull: false  // Asegura que siempre se registre un valor
    },

    
}, {
    timestamps: false  // Deshabilita las columnas createdAt y updatedAt
});

export default ventasModel;
