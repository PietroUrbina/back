import db from "../database/db.js";
import { DataTypes } from "sequelize";


const inventariosModel = db.define('inventarios', {
    id_producto: { type: DataTypes.INTEGER, allowNull: true },
    stock: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.DECIMAL(10,2)},
    unidad_medida: { type: DataTypes.STRING },
    fecha_actualizacion: { type: DataTypes.DATE},
}, {
    timestamps: false,
});

export default inventariosModel;