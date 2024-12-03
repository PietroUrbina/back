    import db from "../database/db.js";
    import { DataTypes } from "sequelize";

    const kardexModel = db.define('kardexs', {
        id_inventario: { type: DataTypes.INTEGER, allowNull: true },
        tipo_movimiento: { type: DataTypes.ENUM('Entrada', 'Salida'), allowNull: false },
        cantidad: { type: DataTypes.INTEGER, allowNull: false },
        fecha_movimiento: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        descripcion: { type: DataTypes.TEXT, allowNull: true  }
    }, {
        timestamps: false
    });

    export default kardexModel;
