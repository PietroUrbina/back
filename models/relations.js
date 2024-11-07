// Importar modelos
import productosModel from './productosModel.js';
import inventariosModel from './inventariosModel.js';
import usuariosModel from './usuariosModel.js';
import clientesModel from './clientesModel.js';
import empleadosModel from './empleadosModel.js';
import ventasModel from './ventasModel.js';
import detalleVentasModel from './detalleVentasModel.js';

// Relación entre productos e inventarios
productosModel.hasMany(inventariosModel, { foreignKey: 'id_producto' });
inventariosModel.belongsTo(productosModel, { foreignKey: 'id_producto' });

// Relación entre ventas y detalleVentas
ventasModel.hasMany(detalleVentasModel, { foreignKey: 'id_venta' });
detalleVentasModel.belongsTo(ventasModel, { foreignKey: 'id_venta' });

// Relación entre detalleVentas y productos (establece la relación para el error específico)
detalleVentasModel.belongsTo(productosModel, { foreignKey: 'id_producto' });
productosModel.hasMany(detalleVentasModel, { foreignKey: 'id_producto' });

// Relación entre ventas y usuarios
ventasModel.belongsTo(usuariosModel, { foreignKey: 'id_usuario' });

// Relación entre ventas y clientes
ventasModel.belongsTo(clientesModel, { foreignKey: 'id_cliente' });

// Relación entre usuarios y empleados
usuariosModel.belongsTo(empleadosModel, { foreignKey: 'id_empleado' });

// Exportar los modelos para uso en toda la aplicación si es necesario
export {
    productosModel,
    inventariosModel,
    ventasModel,
    detalleVentasModel,
    usuariosModel,
    clientesModel,
    empleadosModel
};
