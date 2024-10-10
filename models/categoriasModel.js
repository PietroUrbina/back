import db from "../database/db.js";
import { DataTypes } from "sequelize";

const categoriasModel = db.define('categorias', {
    nombre_categoria: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING }
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default categoriasModel;

