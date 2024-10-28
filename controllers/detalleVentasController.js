import detalleVentasModel from "../models/detalleVentasModel.js";
import inventariosModel from "../models/inventariosModel.js"; // Importar modelo de inventarios

// Obtener todos los detalles de ventas
export const getAllDetallesVentas = async (req, res) => {
    try {
        const detalleVentas = await detalleVentasModel.findAll();
        res.json(detalleVentas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un detalle de venta específico
export const getDetalleVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const detalleVenta = await detalleVentasModel.findAll({
            where: { id_venta: id }
        });
        res.json(detalleVenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un detalle de venta
export const createDetalleVenta = async (req, res) => {
    const { id_venta, id_producto, cantidad } = req.body;

    try {
        // Obtener el precio desde inventarios
        const inventario = await inventariosModel.findOne({
            where: { id_producto: id_producto }
        });

        if (!inventario) {
            return res.status(404).json({ message: "Producto no encontrado en inventarios" });
        }

        const precio_unitario = inventario.precio;

        // Crear el detalle de venta sin almacenar el subtotal
        await detalleVentasModel.create({
            id_venta,
            id_producto,
            cantidad,
        });

        res.json({
            message: "¡Detalle Venta creado correctamente!",
            subtotal: cantidad * precio_unitario // Subtotal calculado en la respuesta
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un detalle de venta
export const updateDetalleVenta = async (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;

    try {
        // Obtener el id_producto del detalle actual
        const detalleExistente = await detalleVentasModel.findByPk(id);
        if (!detalleExistente) {
            return res.status(404).json({ message: "Detalle de venta no encontrado" });
        }

        // Obtener el precio del producto desde inventarios
        const inventario = await inventariosModel.findOne({
            where: { id_producto: detalleExistente.id_producto }
        });

        if (!inventario) {
            return res.status(404).json({ message: "Producto no encontrado en inventarios" });
        }

        const precio_unitario = inventario.precio;

        // Actualizar el detalle de venta sin almacenar el subtotal
        await detalleVentasModel.update(
            { cantidad },
            { where: { id_detalle: id } }
        );

        res.json({
            message: "Detalle Venta actualizado correctamente!",
            subtotal: cantidad * precio_unitario // Subtotal calculado en la respuesta
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un detalle de venta
export const deleteDetalleVenta = async (req, res) => {
    const { id } = req.params;
    try {
        await detalleVentasModel.destroy({
            where: { id_detalle: id }
        });
        res.json({
            message: "Detalle Venta eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
