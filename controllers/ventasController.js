import db from "../database/db.js";
import ventasModel from "../models/ventasModel.js";
import detalleVentasModel from "../models/detalleVentasModel.js";
import inventariosModel from "../models/inventariosModel.js";
import kardexModel from "../models/kardexModel.js";

// Función para calcular el total de la venta
const calcularTotalVenta = (productos) => {
    return productos.reduce((total, producto) => total + producto.cantidad * producto.precio_unitario, 0);
};
//Mostrar todas la ventas
export const getAllVentas = async (req, res) => {
    const { page = 1, limit = 10, estado, metodo_pago } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (estado) where.estado = estado;
    if (metodo_pago) where.metodo_pago = metodo_pago;

    try {
        const ventas = await ventasModel.findAndCountAll({
            where,
            include: [
                { model: detalleVentasModel },
                { model: clientesModel }
            ],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });

        res.json({
            total: ventas.count,
            currentPage: page,
            totalPages: Math.ceil(ventas.count / limit),
            data: ventas.rows
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una venta
export const createVenta = async (req, res) => {
    const {
        id_usuario,
        id_cliente = null,
        total_pagado,
        metodo_pago,
        productos,
        numero_operacion = null,
        imagen_evidencia = null,
        tipo_comprobante = null,
        estado = "Emitido"
    } = req.body;

    if (!id_usuario || !metodo_pago || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "Faltan datos obligatorios: id_usuario, metodo_pago, productos." });
    }

    const transaction = await db.transaction();

    try {
        const total = calcularTotalVenta(productos);

        const venta = await ventasModel.create(
            {
                id_usuario,
                id_cliente,
                total,
                metodo_pago,
                total_pagado: metodo_pago === "Efectivo" ? total_pagado : null,
                numero_operacion: metodo_pago !== "Efectivo" ? numero_operacion : null,
                imagen_evidencia: metodo_pago !== "Efectivo" ? imagen_evidencia : null,
                estado,
                tipo_comprobante: tipo_comprobante || "Boleta"
            },
            { transaction }
        );

        for (const producto of productos) {
            const { id_producto, cantidad } = producto;

            const inventario = await inventariosModel.findOne({ where: { id_producto }, transaction });
            if (!inventario || inventario.stock < cantidad) {
                throw new Error(`Stock insuficiente para el producto ID: ${id_producto}`);
            }

            await detalleVentasModel.create(
                {
                    id_venta: venta.id,
                    id_producto,
                    cantidad,
                    subtotal: cantidad * inventario.precio
                },
                { transaction }
            );

            await inventario.update(
                {
                    stock: inventario.stock - cantidad,
                    fecha_actualizacion: new Date()
                },
                { where: { id: inventario.id }, transaction }
            );

            await kardexModel.create(
                {
                    id_producto,
                    tipo_movimiento: "Salida",
                    cantidad,
                    fecha_movimiento: new Date(),
                    descripcion: `Venta ID: ${venta.id}`
                },
                { transaction }
            );
        }

        const cambio = metodo_pago === "Efectivo" ? total_pagado - total : 0;

        await transaction.commit();

        res.status(201).json({
            message: "Venta creada correctamente.",
            ventaId: venta.id,
            total,
            cambio: cambio >= 0 ? cambio : 0
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una venta
export const updateVenta = async (req, res) => {
    const { id_venta } = req.params;
    const {
        id_cliente,
        metodo_pago,
        numero_operacion,
        imagen_evidencia,
        estado,
        tipo_comprobante,
        productos = []
    } = req.body;

    const transaction = await db.transaction();

    try {
        const venta = await ventasModel.findByPk(id_venta, { transaction });

        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        await venta.update({
            id_cliente,
            metodo_pago,
            numero_operacion,
            imagen_evidencia,
            estado,
            tipo_comprobante
        }, { transaction });

        if (productos.length > 0) {
            const detallesExistentes = await detalleVentasModel.findAll({ where: { id_venta }, transaction });

            for (const detalle of detallesExistentes) {
                const inventario = await inventariosModel.findOne({
                    where: { id_producto: detalle.id_producto },
                    transaction
                });

                if (inventario) {
                    await inventario.update({
                        stock: inventario.stock + detalle.cantidad,
                        fecha_actualizacion: new Date()
                    }, { transaction });

                    await kardexModel.create({
                        id_producto: detalle.id_producto,
                        tipo_movimiento: "Entrada",
                        cantidad: detalle.cantidad,
                        precio: inventario.precio_venta,
                        fecha_movimiento: new Date(),
                        descripcion: `Reversión por actualización de venta ID: ${id_venta}`
                    }, { transaction });
                }
            }

            await detalleVentasModel.destroy({ where: { id_venta }, transaction });

            for (const producto of productos) {
                const { id_producto, cantidad, precio_unitario } = producto;

                const inventario = await inventariosModel.findOne({
                    where: { id_producto },
                    transaction
                });

                if (!inventario || inventario.stock < cantidad) {
                    throw new Error(`Stock insuficiente para el producto ID: ${id_producto}`);
                }

                await detalleVentasModel.create({
                    id_venta,
                    id_producto,
                    cantidad,
                    subtotal: cantidad * precio_unitario
                }, { transaction });

                await inventario.update({
                    stock: inventario.stock - cantidad,
                    fecha_actualizacion: new Date()
                }, { transaction });

                await kardexModel.create({
                    id_producto,
                    tipo_movimiento: "Salida",
                    cantidad,
                    precio: precio_unitario,
                    fecha_movimiento: new Date(),
                    descripcion: `Actualización de venta ID: ${id_venta}`
                }, { transaction });
            }
        }

        await transaction.commit();

        res.json({ message: "Venta actualizada correctamente." });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

// Actualizar el estado de la venta a 'Cancelado'
export const cancelVenta = async (req, res) => {
    const { id_venta } = req.params;

    try {
        const venta = await ventasModel.findByPk(id_venta);

        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        if (venta.estado === "Cancelado") {
            return res.status(400).json({ message: "La venta ya está cancelada" });
        }

        // Cambiar el estado a "Cancelado"
        await venta.update({ estado: "Cancelado" });

        // Revertir los cambios en inventarios y registrar en el kardex
        const detalles = await detalleVentasModel.findAll({ where: { id_venta } });

        for (const detalle of detalles) {
            const inventario = await inventariosModel.findOne({
                where: { id_producto: detalle.id_producto }
            });

            if (inventario) {
                await inventario.update({
                    stock: inventario.stock + detalle.cantidad,
                    fecha_actualizacion: new Date()
                });

                await kardexModel.create({
                    id_producto: detalle.id_producto,
                    tipo_movimiento: "Entrada",
                    cantidad: detalle.cantidad,
                    precio: inventario.precio_venta,
                    fecha_movimiento: new Date(),
                    descripcion: `Reversión por cancelación de venta ID: ${id_venta}`
                });
            }
        }

        res.json({ message: "Venta cancelada correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una venta
export const deleteVenta = async (req, res) => {
    const { id_venta } = req.params;

    try {
        const venta = await ventasModel.findByPk(id_venta);

        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        if (venta.estado !== "Cancelado") {
            return res.status(400).json({ message: "Solo se pueden eliminar ventas en estado 'Cancelado'." });
        }

        // Eliminar los detalles de la venta
        await detalleVentasModel.destroy({ where: { id_venta } });

        // Eliminar la venta
        await ventasModel.destroy({ where: { id: id_venta } });

        res.json({ message: "Venta eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

