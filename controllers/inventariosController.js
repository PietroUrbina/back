import inventariosModel from "../models/inventariosModel.js";
import kardexModel from "../models/kardexModel.js";
import productosModel from "../models/productosModel.js";
import categoriasModel from "../models/categoriasModel.js";

// Mostrar todos los Inventarios
export const getAllInventarios = async (req, res) => {
    try {
        const inventarios = await inventariosModel.findAll({
            include: [
                {
                    model: productosModel,
                    attributes: ['id', 'nombre_producto'],
                },
            ],
            attributes: ['id', 'id_producto', 'stock', 'precio', 'unidad_medida', 'fecha_actualizacion'], // Asegúrate de incluir "precio"
        });
        res.json(inventarios);
    } catch (error) {
        console.error('Error al obtener inventarios:', error);
        res.status(500).json({ message: error.message });
    }
};

// Registrar un nuevo inventario y generar entrada inicial en el Kardex
export const crearInventario = async (req, res) => {
    const { id_producto, stock, precio, unidad_medida } = req.body;

    try {
        // Verificar si el producto ya tiene inventario
        const existeInventario = await inventariosModel.findOne({ where: { id_producto } });

        if (existeInventario) {
            return res.status(400).json({ message: "El producto ya tiene un inventario registrado." });
        }

        // Obtener el producto relacionado para verificar el precio_venta
        const producto = await productosModel.findByPk(id_producto, {
            attributes: ['precio_venta'],
        });

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        // Usar precio del producto si no se envió un precio
        const precioFinal = precio ?? producto.precio_venta;

        // Crear el registro de inventario
        const inventario = await inventariosModel.create({
            id_producto,
            stock,
            precio: precioFinal,
            unidad_medida,
            fecha_actualizacion: new Date(),
        });

        // Crear la entrada inicial en el Kardex
        await kardexModel.create({
            id_inventario: inventario.id,
            tipo_movimiento: 'Entrada',
            cantidad: stock,
            precio: precioFinal,
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
    const { id_producto, tipo_movimiento, cantidad, unidad_medida, descripcion } = req.body;

    try {
        const inventario = await inventariosModel.findOne({ where: { id_producto } });

        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado para este producto." });
        }

        let nuevoStock = inventario.stock;

        if (tipo_movimiento === "Entrada") {
            nuevoStock += cantidad;
        } else if (tipo_movimiento === "Salida") {
            if (cantidad > nuevoStock) {
                return res.status(400).json({ message: "Cantidad insuficiente en inventario para realizar la salida." });
            }
            nuevoStock -= cantidad;
        } else {
            return res.status(400).json({ message: "Tipo de movimiento inválido. Use 'Entrada' o 'Salida'." });
        }

        // Actualizar inventario
        await inventariosModel.update(
            {
                stock: nuevoStock,
                unidad_medida,
                fecha_actualizacion: new Date(),
            },
            { where: { id_producto } }
        );

        // Registrar movimiento en el Kardex
        await kardexModel.create({
            id_inventario: inventario.id,
            tipo_movimiento,
            cantidad,
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
        attributes: ["id", "id_producto", "stock", "precio", "unidad_medida", "fecha_actualizacion"], // Asegúrate de incluir precio
        include: [
          {
            model: productosModel,
            attributes: ["nombre_producto", "precio_compra", "precio_venta", "fecha_vencimiento"],
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
// Actualizar un inventario existente
export const updateInventario = async (req, res) => {
    const { id } = req.params;
    const { stock, unidad_medida, precio } = req.body;

    try {
        const inventario = await inventariosModel.findByPk(id);

        if (!inventario) {
            return res.status(404).json({ message: "Inventario no encontrado." });
        }

        // Actualizamos el inventario
        await inventario.update({
            stock: stock ?? inventario.stock,
            unidad_medida: unidad_medida ?? inventario.unidad_medida,
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

        const deleted = await inventariosModel.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ message: "Inventario no encontrado para eliminar." });
        }

        res.json({ message: "Inventario eliminado correctamente. Verifica los registros relacionados en el Kardex." });
    } catch (error) {
        console.error("Error al eliminar inventario:", error);
        res.status(500).json({ message: error.message });
    }
};
