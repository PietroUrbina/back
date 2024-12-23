// importamos el Modelo
import { Op } from 'sequelize';
import productosModel from "../models/productosModel.js";
import categoriasModel from "../models/categoriasModel.js";
import inventariosModel from "../models/inventariosModel.js";

//** Metodos para el CRUD **/

// Mostrar todos los Productos
export const getAllProductos = async (req, res) => {
    try {
        const productos = await productosModel.findAll({
            include: [{
                model: categoriasModel,
                attributes: ['nombre_categoria']
            }]
        });

        // Calcular los estados de los productos en una sola operación
        const productosActualizados = await Promise.all(productos.map(async (producto) => {
            const saldo = await inventariosModel.sum('stock', { where: { id_producto: producto.id } }) || 0;
            const nuevoEstado = saldo > 0 ? 'activo' : 'inactivo';

            if (producto.estado !== nuevoEstado) {
                await producto.update({ estado: nuevoEstado });
            }

            return { ...producto.dataValues, saldo }; // Añadimos el saldo al resultado
        }));

        res.json(productosActualizados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Obtener productos con inventario disponible
export const getProductosConInventario = async (req, res) => {
    try {
        const inventarios = await inventariosModel.findAll({
            where: {
                stock: { [Op.gt]: 0 } // Solo productos con stock mayor a 0
            },
            include: [{
                model: productosModel,
                attributes: ['id', 'nombre_producto', 'descripcion'] // Traemos más detalles si es necesario
            }]
        });

        const productos = inventarios.map(inventario => ({
            id: inventario.producto?.id || null,
            nombre: inventario.producto?.nombre_producto || null,
            descripcion: inventario.producto?.descripcion || null,
            stock: inventario.stock,
            precio: inventario.precio
        }));

        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos con inventario", error: error.message });
    }
};



// Mostrar un Producto
export const getProducto = async (req, res) => {
    try {
        const producto = await productosModel.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: categoriasModel,
                    attributes: ['nombre_categoria'],
                },
                {
                    model: productoComboModel, // Relación con productosCombo
                    as: 'productosCombo',
                    include: [
                        {
                            model: productosModel,
                            attributes: ['id', 'nombre_producto'],
                        },
                    ],
                },
            ],
        });

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ message: error.message });
    }
};

// Crear un Producto
export const createProducto = async (req, res) => {
    const { nombre_producto, descripcion, id_categoria, precio_compra, precio_venta, fecha_vencimiento, imagen, productosCombo } = req.body;

    // Validar campos obligatorios
    if (!nombre_producto || !descripcion || !id_categoria || precio_compra == null || precio_venta == null) {
        return res.status(400).json({
            message: "Todos los campos requeridos deben estar presentes: nombre_producto, descripcion, id_categoria, precio_compra, precio_venta."
        });
    }

    try {
        // Verificar que la categoría exista
        const categoria = await categoriasModel.findByPk(id_categoria);
        if (!categoria) {
            return res.status(404).json({ message: "La categoría especificada no existe." });
        }

        // Crear el producto principal
        const producto = await productosModel.create({
            nombre_producto,
            descripcion,
            id_categoria,
            precio_compra,
            precio_venta,
            fecha_vencimiento: fecha_vencimiento || null,
            imagen: imagen || null
        });

        // Si el producto pertenece a la categoría "Combos", manejar la lógica de productosCombo
        if (categoria.nombre_categoria.toLowerCase() === "combos" && productosCombo && productosCombo.length > 0) {
            for (const item of productosCombo) {
                // Crear los productos del combo
                await productoComboModel.create({
                    id_producto_combo: producto.id,
                    id_producto: item.id_producto,
                    cantidad: item.cantidad
                });
            }
        }

        res.status(201).json({ message: "Producto creado correctamente!", producto });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un Producto
export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_categoria, productosCombo } = req.body;

        // Verificar si se incluye una categoría
        if (id_categoria) {
            const categoria = await categoriasModel.findByPk(id_categoria);
            if (!categoria) {
                return res.status(404).json({ message: "La categoría especificada no existe." });
            }
        }

        // Actualizar el producto principal
        const [updated] = await productosModel.update(req.body, {
            where: { id },
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Producto no encontrado para actualizar." });
        }

        // Manejar la lógica de productosCombo si aplica
        if (id_categoria && productosCombo && productosCombo.length > 0) {
            const categoria = await categoriasModel.findByPk(id_categoria);
            if (categoria.nombre_categoria.toLowerCase() === "combos") {
                // Eliminar los productos actuales del combo
                await productoComboModel.destroy({ where: { id_producto_combo: id } });

                // Crear los nuevos productos del combo
                for (const item of productosCombo) {
                    await productoComboModel.create({
                        id_producto_combo: id,
                        id_producto: item.id_producto,
                        cantidad: item.cantidad,
                    });
                }
            }
        }

        res.json({ message: "Producto actualizado correctamente!" });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un Producto
export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await productosModel.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Producto no encontrado para eliminar." });
        }

        res.json({ message: "Producto eliminado correctamente. Loss registros relacionadas se han establecido en NULL según la configuración." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

