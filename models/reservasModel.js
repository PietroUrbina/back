import db from "../database/db.js";
import { DataTypes } from "sequelize";

const reservasModel = db.define('reservas', {
    id_cliente: { type: DataTypes.INTEGER },
    fecha_reserva: { type: DataTypes.DATE },
    hora_inicio: { type: DataTypes.TIME },
    hora_fin: { type: DataTypes.TIME },
    estado: { 
        type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
        allowNull: false // Esto asegura que siempre se registre un valor
    },
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default reservasModel;

