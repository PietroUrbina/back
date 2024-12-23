// Importamos el Modelo
import productoComboModel from "../models/productosCombosModel.js";

// ** Métodos para el CRUD **

// Mostrar todos los productos de un combo
export const getAllProductosCombo = async (req, res) => {
    try {
        const productosCombo = await productoComboModel.findAll();
        res.json(productosCombo);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar los productos de un combo específico
export const getProductosByCombo = async (req, res) => {
    try {
        const productos = await productoComboModel.findAll({
            where: { id_producto_combo: req.params.id_combo },
            include: [
                {
                    model: productosModel,
                    attributes: ['id', 'nombre_producto', 'descripcion', 'precio_venta'],
                },
            ],
        });

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos del combo:", error);
        res.status(500).json({ message: "Error al obtener los productos del combo.", error: error.message });
    }
};

// Agregar un producto a un combo
export const createProductoCombo = async (req, res) => {
    const { id_producto_combo, id_producto, cantidad } = req.body;

    try {
        await productoComboModel.create({ id_producto_combo, id_producto, cantidad });
        res.json({ message: "¡Producto agregado al combo correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un producto en un combo
export const updateProductoCombo = async (req, res) => {
    try {
        await productoComboModel.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: "¡Producto en combo actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un producto de un combo
export const deleteProductoCombo = async (req, res) => {
    try {
        await productoComboModel.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: "Producto eliminado del combo correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
