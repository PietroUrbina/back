import db from "../database/db.js";
import { DataTypes } from "sequelize";

const boxModel = db.define('boxs', {
    nombre_box: { type: DataTypes.STRING },
    capacidad: { type: DataTypes.INTEGER },
    requisitos: { type: DataTypes.STRING}
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default boxModel;

