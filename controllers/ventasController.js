import db from "../database/db.js"; // Importar la base de datos para manejar transacciones
import ventasModel from "../models/ventasModel.js";
import detalleVentasModel from "../models/detalleVentasModel.js";
import inventariosModel from "../models/inventariosModel.js";
import usuariosModel from "../models/usuariosModel.js";
import clientesModel from "../models/clientesModel.js";

// Función de utilidad para calcular el total de la venta
const calcularTotalVenta = (productos) => {
    return productos.reduce((total, producto) => {
        return total + producto.cantidad * producto.precio_unitario;
    }, 0);
};

// Crear una venta
export const createVenta = async (req, res) => {
    const { id_usuario, id_cliente, metodo_pago, productos, total_pagado, numero_operacion, imagen_evidencia, tipo_comprobante } = req.body;

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "No hay productos en la venta" });
    }

    const transaction = await db.transaction(); // Iniciar una transacción

    try {
        // Calcular el total de la venta
        const total = calcularTotalVenta(productos);

        // Crear la venta en la tabla `ventas`
        const venta = await ventasModel.create({
            id_usuario,
            id_cliente,
            total,
            metodo_pago,
            numero_operacion,
            imagen_evidencia: imagen_evidencia || null, // Asignar evidencia si existe
            fecha_emision: new Date(),
            estado: 'Emitido',
            tipo_comprobante
        }, { transaction });

        // Registrar cada producto en `detalleventas` y actualizar inventario
        for (const producto of productos) {
            const { id_producto, cantidad, precio_unitario } = producto;

            // Registrar el detalle de la venta
            await detalleVentasModel.create({
                id_venta: venta.id,  // ID de la venta creada
                id_producto,
                cantidad,
                precio_unitario,
                subtotal: cantidad * precio_unitario // Calcular el subtotal
            }, { transaction });

            // Actualizar el stock en `inventarios`
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

        // Calcular el cambio devuelto al cliente
        const cambio = total_pagado - total;

        // Confirmar la transacción
        await transaction.commit();

        res.json({
            message: "Venta creada correctamente!",
            ventaId: venta.id,
            total,
            cambio: cambio >= 0 ? cambio : 0
        });
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        res.status(500).json({ message: error.message });
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
                    attributes: ['dni', 'nombre', 'apellido']
                }
            ]
        });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar una venta específica
export const getVenta = async (req, res) => {
    const { id_venta } = req.params;
    try {
        const venta = await ventasModel.findOne({
            where: { id_venta },
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
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para actualizar una venta
export const updateVenta = async (req, res) => {
    const { id_venta } = req.params; // Identificador de la venta
    const { id_cliente, metodo_pago, numero_operacion, imagen_evidencia, estado, tipo_comprobante } = req.body;

    try {
        // Buscar la venta por su ID
        const venta = await ventasModel.findByPk(id_venta);
        
        // Verificar si la venta existe
        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        // Actualizar los campos permitidos
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
            where: { id_venta }
        });
        res.json({
            message: "Venta eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
