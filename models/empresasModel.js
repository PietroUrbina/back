import db from "../database/db.js";
import { DataTypes } from "sequelize";

const empresasModel = db.define('empresas', {
    ruc: { type: DataTypes.STRING},
    razon_social: { type: DataTypes.STRING },
    direccion: { type: DataTypes.TEXT },
    estado: { type: DataTypes.STRING },
    tipo_contribuyente: {type: DataTypes.STRING},   
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default empresasModel;