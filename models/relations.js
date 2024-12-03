// Importar modelos
import productosModel from './productosModel.js';
import inventariosModel from './inventariosModel.js';
import kardexModel from './kardexModel.js';
import usuariosModel from './usuariosModel.js';
import clientesModel from './clientesModel.js';
import empleadosModel from './empleadosModel.js';
import ventasModel from './ventasModel.js';
import detalleVentasModel from './detalleVentasModel.js';
import categoriasModel from './categoriasModel.js';
import reservasModel from './reservasModel.js';
import detalleReservasModel from './detalleReservasModel.js';
import detalleBoxModel from './detalleBoxModel.js';
import boxModel from './boxModel.js';
import promocionesClientesModel from './promocionesClientesModel.js';
import promocionesModel from './promocionesModel.js';
import empresasModel from './empresasModel.js';

// ----------------------------------------
// Relación entre productos y categorías
productosModel.belongsTo(categoriasModel, { foreignKey: 'id_categoria' });
categoriasModel.hasMany(productosModel, { foreignKey: 'id_categoria' });

// Relación entre productos e inventarios
productosModel.hasMany(inventariosModel, { foreignKey: 'id_producto' });
inventariosModel.belongsTo(productosModel, { foreignKey: 'id_producto' });

// Relación entre inventarios y kardex
inventariosModel.hasMany(kardexModel, { foreignKey: "id_inventario" });
kardexModel.belongsTo(inventariosModel, { foreignKey: "id_inventario" });

// Relación entre ventas y detalleVentas
ventasModel.hasMany(detalleVentasModel, { foreignKey: 'id_venta' });
detalleVentasModel.belongsTo(ventasModel, { foreignKey: 'id_venta' });

// Relación entre detalleVentas y productos
detalleVentasModel.belongsTo(productosModel, { foreignKey: 'id_producto' });
productosModel.hasMany(detalleVentasModel, { foreignKey: 'id_producto' });

// Relación entre ventas y usuarios
ventasModel.belongsTo(usuariosModel, { foreignKey: 'id_usuario' });
usuariosModel.hasMany(ventasModel, { foreignKey: 'id_usuario' });

// Relación entre ventas y clientes
ventasModel.belongsTo(clientesModel, { foreignKey: 'id_cliente' });
clientesModel.hasMany(ventasModel, { foreignKey: 'id_cliente' });

// Relación entre usuarios y empleados
usuariosModel.belongsTo(empleadosModel, { foreignKey: 'id_empleado' });
empleadosModel.hasMany(usuariosModel, { foreignKey: 'id_empleado' });

// Relación entre clientes y empresas
clientesModel.belongsTo(empresasModel, { foreignKey: 'id_empresa' });
empresasModel.hasMany(clientesModel, { foreignKey: 'id_empresa' });

// Relación entre reservas y clientes
reservasModel.belongsTo(clientesModel, { foreignKey: 'id_cliente' });
clientesModel.hasMany(reservasModel, { foreignKey: 'id_cliente' });

// Relación entre reservas y usuarios
reservasModel.belongsTo(usuariosModel, { foreignKey: 'id_usuario' });
usuariosModel.hasMany(reservasModel, { foreignKey: 'id_usuario' });

// Relación entre detalleReservas y reservas
detalleReservasModel.belongsTo(reservasModel, { foreignKey: 'id_reserva' });
reservasModel.hasMany(detalleReservasModel, { foreignKey: 'id_reserva' });

// Relación entre detalleReservas y box
detalleReservasModel.belongsTo(boxModel, { foreignKey: 'id_box' });
boxModel.hasMany(detalleReservasModel, { foreignKey: 'id_box' });

// Relación entre detalleBox y box
detalleBoxModel.belongsTo(boxModel, { foreignKey: 'id_box' });
boxModel.hasMany(detalleBoxModel, { foreignKey: 'id_box' });

// Relación entre detalleBox y productos
detalleBoxModel.belongsTo(productosModel, { foreignKey: 'id_producto' });
productosModel.hasMany(detalleBoxModel, { foreignKey: 'id_producto' });

// Relación entre promocionesClientes y clientes
promocionesClientesModel.belongsTo(clientesModel, { foreignKey: 'id_cliente' });
clientesModel.hasMany(promocionesClientesModel, { foreignKey: 'id_cliente' });

// Relación entre promocionesClientes y promociones
promocionesClientesModel.belongsTo(promocionesModel, { foreignKey: 'id_promocion' });
promocionesModel.hasMany(promocionesClientesModel, { foreignKey: 'id_promocion' });

// ----------------------------------------
// Exportar los modelos para uso en toda la aplicación si es necesario
export {
    productosModel,
    inventariosModel,
    ventasModel,
    detalleVentasModel,
    usuariosModel,
    clientesModel,
    empleadosModel,
    categoriasModel,
    reservasModel,
    detalleReservasModel,
    detalleBoxModel,
    boxModel,
    promocionesClientesModel,
    promocionesModel,
    empresasModel
};
