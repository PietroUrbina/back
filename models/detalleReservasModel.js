import db from "../database/db.js";
import { DataTypes } from "sequelize";

const detalleReservasModel = db.define('detallereservas', {
    id_reserva: { type: DataTypes.INTEGER, allowNull: true },
    id_box: { type: DataTypes.INTEGER, allowNull: true },
    disponibilidad: { type: DataTypes.ENUM('Si','No'), },
}, {
    timestamps: false  // Deshabilita createdAt y updatedAt
});

export default detalleReservasModel;