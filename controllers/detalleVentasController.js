import detalleVentasModel from "../models/detalleVentasModel.js";
import inventariosModel from "../models/inventariosModel.js"; // Importar modelo de inventarios

// Obtener todos los detalles de ventas (con paginación)
export const getAllDetallesVentas = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const detalles = await detalleVentasModel.findAndCountAll({
            offset: parseInt(offset),
            limit: parseInt(limit)
        });

        res.json({
            total: detalles.count,
            currentPage: page,
            totalPages: Math.ceil(detalles.count / limit),
            data: detalles.rows
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Mostrar un detalle de venta específico
export const getDetalleVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const detalleVenta = await detalleVentasModel.findOne({
            where: { id_venta: id }
        });
        res.json(detalleVenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un detalle de venta
export const createDetalleVenta = async (req, res) => {
    const { id_venta, id_producto, cantidad, pagado } = req.body;

    try {
        const inventario = await inventariosModel.findOne({ where: { id_producto } });

        if (!inventario) {
            return res.status(404).json({ message: "Producto no encontrado en inventarios" });
        }

        const precio_unitario = inventario.precio;
        const subtotal = cantidad * precio_unitario;
        const cambio = pagado - subtotal;

        if (pagado < subtotal) {
            return res.status(400).json({ message: "El monto pagado no puede ser menor al subtotal." });
        }

        const detalle = await detalleVentasModel.create({
            id_venta,
            id_producto,
            cantidad,
            subtotal,
            pagado,
            cambio
        });

        res.status(201).json({
            message: "Detalle Venta creado correctamente.",
            detalle
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un detalle de venta
export const updateDetalleVenta = async (req, res) => {
    const { id } = req.params;
    const { cantidad, pagado, vuelto } = req.body;

    try {
        // Verificar que el detalle de venta exista
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
        const subtotal = cantidad * precio_unitario;

        // Actualizar el detalle de venta
        await detalleVentasModel.update(
            { cantidad, subtotal, pagado, vuelto },
            { where: { id } }
        );

        res.json({
            message: "Detalle Venta actualizado correctamente!",
            updatedDetalle: {
                id,
                cantidad,
                subtotal,
                pagado,
                vuelto
            }
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
