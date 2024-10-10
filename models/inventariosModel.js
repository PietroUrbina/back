import db from "../database/db.js";
import { DataTypes } from "sequelize";

const inventariosModel = db.define('inventarios', {
    id_producto: { type: DataTypes.INTEGER },
    tipo_movimiento: { 
        type: DataTypes.ENUM('Entrada', 'Salida'),
        allowNull: false  // Asegura que siempre se registre un valor
    },
    stock: { type: DataTypes.INTEGER},
    unidad_medida: { type: DataTypes.STRING},
    fecha_movimiento: {
        type: DataTypes.DATE,  // Sequelize usa DataTypes.DATE para manejar TIMESTAMP
        defaultValue: DataTypes.NOW,  // Establece la fecha y hora actuales de forma predeterminada
        allowNull: false  // Puedes forzar que este campo no sea nulo
      }      

}, {
    timestamps: false  // Opcional: deshabilitar createdAt y updatedAt
});

export default inventariosModel;

