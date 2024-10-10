import db from "../database/db.js";
import { DataTypes } from "sequelize";

const reservasModel = db.define('reservas', {
    id_cliente: { type: DataTypes.INTEGER },
    fecha_reserva: { type: DataTypes.DATE },
    num_personas:{type: DataTypes.INTEGER},
    hora_inicio: { type: DataTypes.TIME },
    hora_fin: { type: DataTypes.TIME },
    estado: { 
        type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
        allowNull: false // Esto asegura que siempre se registre un valor
    },
    id_usuario: { type: DataTypes.INTEGER},
    fecha_creacion: {
        type: DataTypes.DATE,  // Sequelize usa DataTypes.DATE para manejar TIMESTAMP
        defaultValue: DataTypes.NOW,  // Establece la fecha y hora actuales de forma predeterminada
        allowNull: false  // Puedes forzar que este campo no sea nulo
      }  
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default reservasModel;

