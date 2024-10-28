//importamos el Modelo
import inventariosModel from "../models/inventariosModel.js";
import productosModel from "../models/productosModel.js";
import categoriasModel from "../models/categoriasModel.js";

//**Metodos para el CRUD */

// Mostrar todos los Inventarios
export const getAllInventarios = async (req, res) => {
    try {
        const inventarios = await inventariosModel.findAll({
            include: [{
                model: productosModel, // Relacionamos con el modelo de productos
                attributes: ['nombre'] // Traemos solo el nombre del producto
            }]
        });
        res.json(inventarios);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un Inventario por id_producto (con la relación de productos y categorías)
export const getInventarioByProductoId = async (req, res) => {
    try {
        const inventario = await inventariosModel.findOne({
            where: { id_producto: req.params.id_producto },
            include: [{
                model: productosModel,
                attributes: ['nombre', 'costo', 'fecha_vencimiento'],  // Traemos los detalles del producto
                include: [{
                    model: categoriasModel,  // Aquí traemos la categoría
                    attributes: ['nombre_categoria']  // Solo traemos el nombre de la categoría
                }]
            }]
        });

        if (!inventario) {
            return res.status(404).json({ message: 'Inventario no encontrado para este producto' });
        }

        res.json(inventario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un inventario
export const createInventario = async (req, res) => {
    const { id_producto, stock, precio, unidad_medida, tipo_movimiento, fecha_movimiento } = req.body;

    try {
        await inventariosModel.create({ id_producto, stock, precio, unidad_medida, tipo_movimiento, fecha_movimiento });

        res.json({
            message: "¡Inventario creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Actualizar un Inventario
export const updateInventario = async (req, res) => {
    try {
        await inventariosModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            message: "Inventario actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Eliminar un Inventario
export const deleteInventario = async (req, res) => {
    try {
        await inventariosModel.destroy({
            where: { id: req.params.id }
        });
        res.json({
            message: "Inventario eliminado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
