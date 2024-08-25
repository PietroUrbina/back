import db from "../database/db.js";
import { DataTypes } from "sequelize";

const boxModel = db.define('box', {
    nombre_box: { type: DataTypes.STRING },
    capacidad: { type: DataTypes.INTEGER }
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default boxModel;

