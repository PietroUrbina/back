import db from "../database/db.js";
import { DataTypes } from "sequelize";

const promocionesClientesModel = db.define('promociones_clientes', {
    id_cliente: { type: DataTypes.INTEGER },
    id_promocion: { type: DataTypes.INTEGER },
    fecha_aplicacion: { type: DataTypes.DATE },
    
}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default promocionesClientesModel;

