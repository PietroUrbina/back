import db from "../database/db.js";
import { DataTypes } from "sequelize";

const empleadosModel = db.define('empleados', {
    nombre: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING },
    telefono: { type: DataTypes.INTEGER},
    email: { type: DataTypes.STRING},
    fecha_contratacion: { type: DataTypes.DATE}
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default empleadosModel;

