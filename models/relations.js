// models/relations.js
import productosModel from './productosModel.js';
import inventariosModel from './inventariosModel.js';

// Definir la relación correctamente
productosModel.hasMany(inventariosModel, { foreignKey: 'id_producto' });
inventariosModel.belongsTo(productosModel, { foreignKey: 'id_producto' });


// Exportar los modelos por si es necesario importarlos en algún archivo conjunto
export { productosModel, inventariosModel };
