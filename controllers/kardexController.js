import kardexModel from "../models/kardexModel.js";
import inventariosModel from "../models/inventariosModel.js";
import productosModel from "../models/productosModel.js";


export const obtenerKardexGlobal = async (req, res) => {
    try {
        // Obtener todos los movimientos del Kardex junto con los nombres de los productos
        const movimientos = await kardexModel.findAll({
            include: [
                {
                    model: inventariosModel,
                    include: [{ model: productosModel, attributes: ["nombre_producto"] }],
                    attributes: ["id", "stock"], // Datos adicionales del inventario
                },
            ],
            order: [["fecha_movimiento", "ASC"]],
        });

        if (!movimientos.length) {
            return res.status(404).json({ message: "No hay movimientos registrados en el Kardex." });
        }

        // Formatear la respuesta
        const formattedMovimientos = movimientos.map((mov) => ({
            id: mov.id,
            nombre_producto: mov.inventario?.producto?.nombre_producto || "Producto desconocido",
            id_inventario: mov.id_inventario,
            tipo_movimiento: mov.tipo_movimiento,
            cantidad: mov.cantidad,
            fecha_movimiento: mov.fecha_movimiento,
            descripcion: mov.descripcion || "-",
        }));

        res.json(formattedMovimientos);
    } catch (error) {
        console.error("Error al obtener el Kardex global:", error);
        res.status(500).json({ message: "Error al obtener el Kardex global." });
    }
};

export const obtenerKardexInventario = async (req, res) => {
    const { id_inventario } = req.params;

    try {
        // Obtener inventario con producto
        const inventario = await inventariosModel.findByPk(id_inventario, {
            include: [{ model: productosModel, attributes: ["nombre_producto"] }],
        });

        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado." });
        }

        // Buscar movimientos del Kardex
        const movimientos = await kardexModel.findAll({
            where: { id_inventario },
            order: [["fecha_movimiento", "ASC"]],
        });

        if (!movimientos.length) {
            return res.status(404).json({
                message: "No hay movimientos registrados en el Kardex para este inventario.",
            });
        }

        // Respuesta con precio del inventario
        res.json({ 
            producto: inventario.producto, 
            precio: inventario.precio, // Precio del inventario
            movimientos 
        });
    } catch (error) {
        console.error("Error al obtener Kardex:", error);
        res.status(500).json({ message: "Error al obtener el Kardex." });
    }
};

// Registrar un movimiento en el Kardex (independiente del inventario)
export const registrarMovimientoDirectoKardex = async (req, res) => {
    const { id_inventario, tipo_movimiento, cantidad, precio, descripcion } = req.body;

    try {
        // Validar que el inventario exista
        const inventario = await inventariosModel.findByPk(id_inventario);

        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado." });
        }

        // Validar stock si el movimiento es de salida
        if (tipo_movimiento === "Salida") {
            if (cantidad > inventario.stock) {
                return res
                    .status(400)
                    .json({ message: "Stock insuficiente para realizar la salida." });
            }
        }

        // Obtener el último saldo del Kardex
        const ultimoMovimiento = await kardexModel.findOne({
            where: { id_inventario },
            order: [["fecha_movimiento", "DESC"]],
        });

        const saldoAnterior = ultimoMovimiento ? ultimoMovimiento.saldo : 0;

        // Calcular el nuevo saldo en base al tipo de movimiento
        const nuevoSaldo =
            tipo_movimiento === "Entrada"
                ? saldoAnterior + cantidad
                : saldoAnterior - cantidad;

        // Registrar movimiento en el Kardex
        const movimiento = await kardexModel.create({
            id_inventario,
            tipo_movimiento,
            cantidad,
            precio: precio || inventario.precio,
            saldo: nuevoSaldo,
            fecha_movimiento: new Date(),
            descripcion: descripcion || "Movimiento directo registrado",
        });

        // Actualizar el stock en el inventario
        const nuevoStock =
            tipo_movimiento === "Entrada"
                ? inventario.stock + cantidad
                : inventario.stock - cantidad;

        await inventariosModel.update(
            { stock: nuevoStock, fecha_actualizacion: new Date() },
            { where: { id: id_inventario } }
        );

        res.status(201).json({ message: "Movimiento registrado correctamente en el Kardex.", movimiento });
    } catch (error) {
        console.error("Error al registrar movimiento en el Kardex:", error);
        res.status(500).json({ message: "Error al registrar movimiento en el Kardex." });
    }
};
