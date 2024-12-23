// Importamos el Modelo
import unidadMedidaModel from "../models/unidadMedidaModel.js";

// ** Métodos para el CRUD **

// Mostrar todas las unidades de medida
export const getAllUnidadesMedida = async (req, res) => {
    try {
        const unidades = await unidadMedidaModel.findAll();
        res.json(unidades);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar una unidad de medida
export const getUnidadMedida = async (req, res) => {
    try {
        const unidad = await unidadMedidaModel.findOne({
            where: { id: req.params.id },
        });
        res.json(unidad);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear una nueva unidad de medida
export const createUnidadMedida = async (req, res) => {
    const { nombre_unidad, factor_conversion, descripcion } = req.body;

    try {
        await unidadMedidaModel.create({ nombre_unidad, factor_conversion, descripcion });
        res.json({ message: "¡Unidad de medida creada correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una unidad de medida
export const updateUnidadMedida = async (req, res) => {
    try {
        await unidadMedidaModel.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({ message: "¡Unidad de medida actualizada correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar una unidad de medida
export const deleteUnidadMedida = async (req, res) => {
    try {
        await unidadMedidaModel.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: "Unidad de medida eliminada correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
