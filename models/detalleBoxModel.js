import db from "../database/db.js";
import { DataTypes } from "sequelize";

const detalleBoxModel = db.define('detalleboxs', {
    id_box: { type: DataTypes.INTEGER},
    id_producto: { type: DataTypes.INTEGER},
    cantidad_minima: { type: DataTypes.INTEGER},
    observaciones: { type: DataTypes.STRING}
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default detalleBoxModel;

