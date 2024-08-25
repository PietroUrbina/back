import db from "../database/db.js";
import { DataTypes } from "sequelize";

const inventariosModel = db.define('inventarios', {
    id_producto: { type: DataTypes.INTEGER },
    cantidad: { type: DataTypes.INTEGER },
    fecha_entrada: { type: DataTypes.DATE },
    fecha_salida: { type: DataTypes.DATE },
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default inventariosModel;

