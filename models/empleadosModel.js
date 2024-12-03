import db from "../database/db.js";
import { DataTypes } from "sequelize";

const empleadosModel = db.define('empleados', {
    dni: { type: DataTypes.STRING},
    nombre_completo: { type: DataTypes.STRING },
    direccion: { type: DataTypes.TEXT },
    telefono: { type: DataTypes.STRING},
    email: { type: DataTypes.STRING},
    fecha_contratacion: { type: DataTypes.DATE}
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default empleadosModel;