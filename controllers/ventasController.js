import db from "../database/db.js";
import ventasModel from "../models/ventasModel.js";
import detalleVentasModel from "../models/detalleVentasModel.js";
import inventariosModel from "../models/inventariosModel.js";
import usuariosModel from "../models/usuariosModel.js";
import empleadosModel from "../models/empleadosModel.js";
import clientesModel from "../models/clientesModel.js";
import productosModel from "../models/productosModel.js";

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
        estado = 'Emitido'
    } = req.body;

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "No hay productos en la venta" });
    }

    const transaction = await db.transaction();

    try {
        console.log("Datos recibidos en el servidor:", req.body);

        const total = calcularTotalVenta(productos);

        const venta = await ventasModel.create({
            id_usuario,
            id_cliente,
            total,
            metodo_pago,
            total_pagado: metodo_pago === "efectivo" ? total_pagado : null,
            numero_operacion: metodo_pago !== "efectivo" ? numero_operacion : null,
            imagen_evidencia: metodo_pago !== "efectivo" ? imagen_evidencia : null,
            estado,
            tipo_comprobante: tipo_comprobante || 'Boleta'
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
        console.error("Error al crear la venta:", error);
        res.status(500).json({
            message: "Error al registrar la venta. Verifica los datos y vuelve a intentar.",
            error: error.message
        });
    }
};

// Obtener todas las ventas con sus detalles, incluyendo los datos del usuario y el empleado asociado
export const getAllVentas = async (req, res) => {
    try {
        const ventas = await ventasModel.findAll({
            include: [
                {
                    model: usuariosModel,
                    attributes: ['nombre_usuario'],
                    include: [
                        {
                            model: empleadosModel,
                            attributes: ['nombre_empleado', 'apellido_empleado']  // Usar nombres correctos de columnas
                        }
                    ]
                },
                {
                    model: clientesModel,
                    attributes: ['dni', 'nombre', 'apellido'],
                    required: false
                }
            ]
        });

        const ventasConClienteYVendedor = ventas.map(venta => {
            const vendedorNombre = venta.usuario?.empleado
                ? `${venta.usuario.empleado.nombre_empleado.split(" ")[0]} ${venta.usuario.empleado.apellido_empleado.split(" ")[0]}`
                : "Desconocido";
            return {
                ...venta.toJSON(),
                cliente: venta.cliente ? `${venta.cliente.nombre} ${venta.cliente.apellido}` : "Público General",
                vendedor: vendedorNombre
            };
        });

        res.json(ventasConClienteYVendedor);
    } catch (error) {
        console.error("Error al obtener las ventas:", error);
        res.status(500).json({ message: "Error al obtener las ventas.", error: error.message });
    }
};


// Obtener una venta específica con detalles y productos
export const getVenta = async (req, res) => {
    const { id } = req.params; // Cambia a "id" para que coincida con la ruta
    try {
        const venta = await ventasModel.findOne({
            where: { id }, // Usa "id" directamente en la condición where
            include: [
                {
                    model: usuariosModel,
                    attributes: ['nombre_usuario'],
                    include: [
                        {
                            model: empleadosModel,
                            attributes: ['nombre_empleado', 'apellido_empleado']
                        }
                    ]
                },
                {
                    model: clientesModel,
                    attributes: ['dni', 'nombre', 'apellido']
                },
                {
                    model: detalleVentasModel,
                    attributes: ['id_producto', 'cantidad', 'subtotal'],
                    include: [
                        {
                            model: productosModel,
                            attributes: ['nombre']
                        }
                    ]
                }
            ]
        });

        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        const ventaConVendedor = {
            ...venta.toJSON(),
            vendedor: venta.usuario && venta.usuario.empleado
                ? `${venta.usuario.empleado.nombre_empleado} ${venta.usuario.empleado.apellido_empleado}`
                : "Desconocido",
            cliente: venta.cliente ? `${venta.cliente.nombre} ${venta.cliente.apellido}` : "Público General"
        };

        res.json(ventaConVendedor);
    } catch (error) {
        console.error("Error al obtener la venta:", error);
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
