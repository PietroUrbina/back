import db from "../database/db.js";
import { DataTypes } from "sequelize";

const promocionesClientesModel = db.define('promocionesclientes', {
    id_cliente: { type: DataTypes.INTEGER, allowNull: true },
    id_promocion: { type: DataTypes.INTEGER, allowNull: true },
    fecha_aplicacion: { type: DataTypes.DATE },
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default promocionesClientesModel;