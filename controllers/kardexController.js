import kardexModel from "../models/kardexModel.js";
import inventariosModel from "../models/inventariosModel.js";
import productosModel from "../models/productosModel.js";

export const obtenerKardexInventario = async (req, res) => {
    const { id_inventario } = req.params;

    try {
        // Verificar que el inventario existe
        const inventario = await inventariosModel.findByPk(id_inventario, {
            include: [{ model: productosModel, attributes: ["nombre_producto"] }],
        });

        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado." });
        }

        // Buscar movimientos en el Kardex
        const movimientos = await kardexModel.findAll({
            where: { id_inventario },
            order: [["fecha_movimiento", "ASC"]],
        });

        if (!movimientos.length) {
            return res
                .status(404)
                .json({ message: "No hay movimientos registrados en el Kardex para este inventario." });
        }

        res.json(movimientos);
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
            return res.status(404).json({ message: "inventario no encontrado." });
        }

        // Registrar movimiento en el Kardex
        const movimiento = await kardexModel.create({
            id_inventario,
            tipo_movimiento,
            cantidad,
            precio,
            fecha_movimiento: new Date(),
            descripcion: descripcion || "Movimiento directo registrado",
        });

        res.status(201).json({ message: "Movimiento registrado correctamente en el Kardex.", movimiento });
    } catch (error) {
        console.error("Error al registrar movimiento en el Kardex:", error);
        res.status(500).json({ message: "Error al registrar movimiento en el Kardex." });
    }
};
