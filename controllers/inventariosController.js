import inventariosModel from "../models/inventariosModel.js";
import kardexModel from "../models/kardexModel.js";
import productosModel from "../models/productosModel.js";
import unidadMedidaModel from "../models/unidadMedidaModel.js";

// Mostrar todos los Inventarios
export const getAllInventarios = async (req, res) => {
    try {
        const inventarios = await inventariosModel.findAll({
            include: [
                {
                    model: productosModel,
                    attributes: ['id', 'nombre_producto', 'fecha_vencimiento'],
                },
                {
                    model: unidadMedidaModel,
                    attributes: ['nombre_unidad', 'factor_conversion'],
                },
            ],
            attributes: ['id', 'id_producto', 'stock', 'precio', 'fecha_actualizacion'],
        });
        res.json(inventarios);
    } catch (error) {
        console.error('Error al obtener inventarios:', error);
        res.status(500).json({ message: error.message });
    }
};

// Registrar un nuevo inventario y generar entrada inicial en el Kardex
export const crearInventario = async (req, res) => {
    const { id_producto, stock, precio, id_unidad_medida } = req.body;

    try {
        // Verificar si el producto ya tiene inventario con esta unidad de medida
        const existeInventario = await inventariosModel.findOne({ where: { id_producto, id_unidad_medida } });

        if (existeInventario) {
            return res.status(400).json({ message: "El producto ya tiene un inventario registrado para esta unidad de medida." });
        }

        // Verificar si existe la unidad de medida
        const unidad = await unidadMedidaModel.findByPk(id_unidad_medida);
        if (!unidad) {
            return res.status(404).json({ message: "Unidad de medida no encontrada." });
        }

        // Calcular el stock real basado en el factor de conversión
        const stockReal = stock * unidad.factor_conversion;

        // Crear el registro de inventario
        const inventario = await inventariosModel.create({
            id_producto,
            stock: stockReal,
            precio,
            id_unidad_medida,
            fecha_actualizacion: new Date(),
        });

        // Crear la entrada inicial en el Kardex
        await kardexModel.create({
            id_inventario: inventario.id,
            tipo_movimiento: 'Entrada',
            cantidad: stockReal,
            precio,
            fecha_movimiento: new Date(),
            descripcion: 'Registro inicial en inventario',
        });

        res.status(201).json({ message: 'Inventario y Kardex registrados correctamente.', inventario });
    } catch (error) {
        console.error('Error al registrar inventario:', error);
        res.status(500).json({ message: error.message });
    }
};

// Registrar un movimiento en el inventario y Kardex
export const registrarMovimientoInventario = async (req, res) => {
    const { id_producto, tipo_movimiento, cantidad, id_unidad_medida, descripcion } = req.body;

    try {
        const inventario = await inventariosModel.findOne({ where: { id_producto, id_unidad_medida } });

        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado para este producto y unidad de medida." });
        }

        // Verificar si existe la unidad de medida
        const unidad = await unidadMedidaModel.findByPk(id_unidad_medida);
        if (!unidad) {
            return res.status(404).json({ message: "Unidad de medida no encontrada." });
        }

        // Calcular la cantidad real basada en el factor de conversión
        const cantidadReal = cantidad * unidad.factor_conversion;

        let nuevoStock = inventario.stock;

        if (tipo_movimiento === "Entrada") {
            nuevoStock += cantidadReal;
        } else if (tipo_movimiento === "Salida") {
            if (cantidadReal > nuevoStock) {
                return res.status(400).json({ message: "Cantidad insuficiente en inventario para realizar la salida." });
            }
            nuevoStock -= cantidadReal;
        } else {
            return res.status(400).json({ message: "Tipo de movimiento inválido. Use 'Entrada' o 'Salida'." });
        }

        // Actualizar inventario
        await inventariosModel.update(
            {
                stock: nuevoStock,
                fecha_actualizacion: new Date(),
            },
            { where: { id: inventario.id } }
        );

        // Registrar movimiento en el Kardex
        await kardexModel.create({
            id_inventario: inventario.id,
            tipo_movimiento,
            cantidad: cantidadReal,
            precio: inventario.precio,
            fecha_movimiento: new Date(),
            descripcion: descripcion || "Movimiento registrado manualmente",
        });

        res.status(200).json({ message: "Movimiento registrado correctamente en el inventario y Kardex." });
    } catch (error) {
        console.error("Error al registrar movimiento:", error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener un inventario específico por ID
export const getInventarioById = async (req, res) => {
    try {
        const inventario = await inventariosModel.findOne({
            where: { id: req.params.id },
            attributes: ["id", "id_producto", "stock", "precio", "fecha_actualizacion"],
            include: [
                {
                    model: productosModel,
                    attributes: ["nombre_producto", "precio_compra", "precio_venta", "fecha_vencimiento"],
                },
                {
                    model: unidadMedidaModel,
                    attributes: ["nombre_unidad", "factor_conversion"],
                },
            ],
        });

        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado." });
        }

        res.json(inventario);
    } catch (error) {
        console.error("Error al obtener inventario:", error);
        res.status(500).json({ message: "Error al obtener inventario." });
    }
};  

// Actualizar un inventario existente
export const updateInventario = async (req, res) => {
    const { id } = req.params;
    const { stock, id_unidad_medida, precio } = req.body;

    try {
        const inventario = await inventariosModel.findByPk(id);

        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado." });
        }

        // Validar la nueva unidad de medida
        if (id_unidad_medida) {
            const unidad = await unidadMedidaModel.findByPk(id_unidad_medida);
            if (!unidad) {
                return res.status(404).json({ message: "Unidad de medida no encontrada." });
            }
        }

        // Si hay stock y unidad de medida, recalcular el stock con el factor de conversión
        let nuevoStock = stock;
        if (stock && id_unidad_medida) {
            const unidad = await unidadMedidaModel.findByPk(id_unidad_medida);
            nuevoStock = stock * unidad.factor_conversion;
        }

        // Actualizar inventario
        await inventario.update({
            stock: nuevoStock ?? inventario.stock,
            id_unidad_medida: id_unidad_medida ?? inventario.id_unidad_medida,
            precio: precio ?? inventario.precio,
            fecha_actualizacion: new Date(),
        });

        res.status(200).json({ message: "Inventario actualizado correctamente.", inventario });
    } catch (error) {
        console.error("Error al actualizar inventario:", error);
        res.status(500).json({ message: "Error al actualizar inventario." });
    }
};

// Eliminar un inventario
export const deleteInventario = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el inventario antes de eliminarlo
        const inventario = await inventariosModel.findByPk(id);
        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado para eliminar." });
        }

        // Validar si existen movimientos en el Kardex asociados
        const kardexMovimientos = await kardexModel.findOne({ where: { id_inventario: id } });
        if (kardexMovimientos) {
            return res.status(400).json({
                message: "No se puede eliminar el inventario porque tiene movimientos asociados en el Kardex.",
            });
        }

        // Eliminar el inventario
        await inventariosModel.destroy({ where: { id } });

        res.json({ message: "Inventario eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar inventario:", error);
        res.status(500).json({ message: error.message });
    }
};