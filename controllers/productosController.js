// importamos el Modelo
import { Op } from 'sequelize';
import productosModel from "../models/productosModel.js";
import categoriasModel from "../models/categoriasModel.js";
import inventariosModel from "../models/inventariosModel.js";

//** Metodos para el CRUD **/

// Mostrar todos los Productos
export const getAllProductos = async (req, res) => {
    try {
        const productos = await productosModel.findAll({
            include: [{
                model: categoriasModel, // Hacer el JOIN con categorías
                attributes: ['nombre_categoria'] // Obtener solo el nombre de la categoría
            }]
        });

        // Para cada producto, verificar si está en inventario y actualizar su estado
        for (let producto of productos) {
            const inventario = await inventariosModel.findOne({
                where: { id_producto: producto.id }
            });

            // Si el producto está en inventario, se marca como "activo", de lo contrario "inactivo"
            if (inventario) {
                await producto.update({ estado: 'activo' });
            } else {
                await producto.update({ estado: 'inactivo' });
            }
        }
        res.json(productos);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener productos con inventario disponible
export const getProductosConInventario = async (req, res) => {
    try {
        const inventarios = await inventariosModel.findAll({
            where: {
                stock: { [Op.gt]: 0 }  // Solo productos con stock mayor a 0
            },
            include: [{
                model: productosModel,
                attributes: ['id', 'nombre'] // Solo traemos los campos necesarios del producto
            }]
        });

        console.log("Consulta completada en inventarios:", inventarios);

        // Mapea los datos para que el frontend reciba solo los detalles del producto y el stock
        const productos = inventarios.map(inventario => ({
            id: inventario.producto ? inventario.producto.id : null,         // Acceso directo a `producto`
            nombre: inventario.producto ? inventario.producto.nombre : null,  // Acceso directo a `producto`
            stock: inventario.stock,
            precio: inventario.precio
        }));

        console.log("Productos con inventario mapeados:", productos);

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos con inventario:", error);
        res.status(500).json({ message: "Error al obtener productos con inventario" });
    }
};


// Mostrar un Producto
export const getProducto = async (req, res) => {
    try {
        const producto = await productosModel.findOne({
            where: { id: req.params.id }
        });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear un Producto
export const createProducto = async (req, res) => {
    const { nombre, descripcion, id_categoria, costo, fecha_vencimiento, imagen  } = req.body;
    try {
        await productosModel.create({
            nombre,
            descripcion,
            id_categoria,
            costo,
            fecha_vencimiento: fecha_vencimiento || null,
            imagen
        });
        res.json({ message: "Producto creado correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Actualizar un Producto
export const updateProducto = async (req, res) => {
    try {
        await productosModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ message: "Producto actualizado correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Eliminar un Producto
export const deleteProducto = async (req, res) => {
    try {
        await productosModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
