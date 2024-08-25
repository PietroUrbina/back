import db from "../database/db.js";
import { DataTypes } from "sequelize";

const detalleReservasModel = db.define('detallereservas', {
    id_reserva: { type: DataTypes.INTEGER },
    id_box: { type: DataTypes.INTEGER },
    disponibilidad: { 
        type: DataTypes.BOOLEAN,  // Mapea automáticamente como TINYINT(1) para valores booleanos
        allowNull: false 
    },
}, {
    timestamps: false  // Deshabilita createdAt y updatedAt
});

export default detalleReservasModel;


