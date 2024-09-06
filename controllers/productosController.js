// importamos el Modelo
import productosModel from "../models/productosModel.js";

//** Metodos para el CRUD **/

// Mostrar todos los Productos
export const getAllProductos = async (req, res) => {
    try {
        const productos = await productosModel.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
    const { nombre, precio, stock, fecha_vencimiento } = req.body;
    try {
        await productosModel.create({
            nombre,
            precio,
            stock,
            // Si no se proporciona una fecha, pon null (campo opcional)
            fecha_vencimiento: fecha_vencimiento || null
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
