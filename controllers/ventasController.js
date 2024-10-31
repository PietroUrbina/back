import db from "../database/db.js";
import ventasModel from "../models/ventasModel.js";
import detalleVentasModel from "../models/detalleVentasModel.js";
import inventariosModel from "../models/inventariosModel.js";
import usuariosModel from "../models/usuariosModel.js";
import clientesModel from "../models/clientesModel.js";

const calcularTotalVenta = (productos) => {
    return productos.reduce((total, producto) => {
        return total + producto.cantidad * producto.precio_unitario;
    }, 0);
};

// Crear una venta
export const createVenta = async (req, res) => {
    const {
        id_usuario,
        id_cliente = null,
        metodo_pago,
        productos,
        total_pagado = null,
        numero_operacion = null,
        imagen_evidencia = null,
        tipo_comprobante = null,
        estado = 'Emitido'  // Estado predeterminado como 'Emitido'
    } = req.body;

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "No hay productos en la venta" });
    }

    const transaction = await db.transaction();

    try {
        console.log("Datos recibidos en el servidor:", req.body);  // Depuración inicial

        const total = calcularTotalVenta(productos);

        // Crear la venta en la tabla `ventas`
        const venta = await ventasModel.create({
            id_usuario,
            id_cliente,
            total,
            metodo_pago,
            total_pagado: metodo_pago === "efectivo" ? total_pagado : null,
            numero_operacion: metodo_pago !== "efectivo" ? numero_operacion : null,
            imagen_evidencia: metodo_pago !== "efectivo" ? imagen_evidencia : null,
            fecha_emision: new Date(),
            estado,  // Usar el estado que se recibe o el predeterminado 'Emitido'
            tipo_comprobante: tipo_comprobante || 'Boleta'  // Asegurar valor predeterminado si es null
        }, { transaction });

        for (const producto of productos) {
            const { id_producto, cantidad, precio_unitario } = producto;

            await detalleVentasModel.create({
                id_venta: venta.id,
                id_producto,
                cantidad,
                subtotal: cantidad * precio_unitario
            }, { transaction });

            const inventario = await inventariosModel.findOne({ where: { id_producto }, transaction });
            if (inventario) {
                if (inventario.stock < cantidad) {
                    throw new Error(`Stock insuficiente para el producto ${id_producto}`);
                }
                await inventario.update({ stock: inventario.stock - cantidad }, { transaction });
            } else {
                throw new Error(`Producto con ID ${id_producto} no encontrado en inventario`);
            }
        }

        const cambio = metodo_pago === "efectivo" && total_pagado ? total_pagado - total : 0;

        await transaction.commit();

        res.json({
            message: "Venta creada correctamente!",
            ventaId: venta.id,
            total,
            cambio: cambio >= 0 ? cambio : 0
        });
    } catch (error) {
        await transaction.rollback();
        console.error("Error al crear la venta:", error);  // Registro detallado del error en el servidor
        res.status(500).json({
            message: "Error al registrar la venta. Verifica los datos y vuelve a intentar.",
            error: error.message
        });
    }
};

// Obtener todas las ventas con sus detalles y usuarios
export const getAllVentas = async (req, res) => {
    try {
        const ventas = await ventasModel.findAll({
            include: [
                {
                    model: usuariosModel,
                    attributes: ['nombre_usuario']
                },
                {
                    model: clientesModel,
                    attributes: ['dni', 'nombre', 'apellido'],
                    required: false
                }
            ]
        });

        const ventasConCliente = ventas.map(venta => {
            return {
                ...venta.toJSON(),
                cliente: venta.cliente ? `${venta.cliente.nombre} ${venta.cliente.apellido}` : "Público General"
            };
        });

        res.json(ventasConCliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar una venta específica
export const getVenta = async (req, res) => {
    const { id_venta } = req.params;
    try {
        const venta = await ventasModel.findOne({
            where: { id: id_venta },
            include: [
                {
                    model: usuariosModel,
                    attributes: ['nombre_usuario']
                },
                {
                    model: clientesModel,
                    attributes: ['dni', 'nombre', 'apellido']
                }
            ]
        });
        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para actualizar una venta
export const updateVenta = async (req, res) => {
    const { id_venta } = req.params;
    const { id_cliente, metodo_pago, numero_operacion, imagen_evidencia, estado, tipo_comprobante } = req.body;

    try {
        const venta = await ventasModel.findByPk(id_venta);
        
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
        });

        res.json({ message: "Venta actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una venta
export const deleteVenta = async (req, res) => {
    const { id_venta } = req.params;
    try {
        await ventasModel.destroy({
            where: { id: id_venta }
        });
        res.json({
            message: "Venta eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
