import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ventasModel = db.define('ventas', {
    id_cliente: { type: DataTypes.INTEGER },
    fecha_venta: { type: DataTypes.DATE },
    total: { type: DataTypes.DECIMAL(10,2) },
    metodo_pago: { 
        
        type: DataTypes.ENUM('efectivo', 'tarjeta', 'yape', 'plin'),
        allowNull: false  // Asegura que siempre se registre un valor en método de pago
    },
    
}, {
    timestamps: false  // Deshabilita las columnas createdAt y updatedAt
});

export default ventasModel;
