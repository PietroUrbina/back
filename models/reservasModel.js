import db from "../database/db.js";
import { DataTypes } from "sequelize";

const reservasModel = db.define('reservas', {
    id_cliente: { type: DataTypes.INTEGER, allowNull: true },
    fecha_reserva: { type: DataTypes.DATE },
    num_personas:{type: DataTypes.INTEGER, allowNull: true},
    estado: { 
        type: DataTypes.ENUM('Pendiente', 'Confirmada', 'Cancelada','Expirada'),
        allowNull: false
    },
    id_usuario: { type: DataTypes.INTEGER, allowNull: true},
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false 
      }  
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default reservasModel;

