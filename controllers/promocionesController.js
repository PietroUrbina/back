//importamos el Modelo
import promocionesModel from "../models/promocionesModel.js";

//**Metodos para el CRUD */

//Mostrar todas las promociones
export const getAllPromociones = async (req, res) => {
    try {
        const promociones = await promocionesModel.findAll();
        res.json(promociones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Mostrar una promocion
export const getPromocion = async (req, res) => {
    try {
        const promocion = await promocionesModel.findOne({
            where: { id: req.params.id }
        });

        if (!promocion) {
            return res.status(404).json({ message: "Promoción no encontrada" });
        }

        res.json(promocion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//crear una promocion
export const createPromocion = async (req, res) => {
    const { nombre_promocion, descripcion, descuento_porcentaje, descuento_fijo, fecha_inicio, fecha_fin } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!nombre_promocion || !fecha_inicio || !fecha_fin || (!descuento_porcentaje && !descuento_fijo)) {
        return res.status(400).json({ message: "Todos los campos obligatorios deben estar presentes: nombre_promocion, fechas y al menos un descuento (porcentaje o fijo)." });
    }

    // Validar que las fechas sean coherentes
    if (new Date(fecha_inicio) > new Date(fecha_fin)) {
        return res.status(400).json({ message: "La fecha de inicio no puede ser posterior a la fecha de fin." });
    }

    try {
        // Crear la promoción
        const promocion = await promocionesModel.create({
            nombre_promocion,
            descripcion,
            descuento_porcentaje: descuento_porcentaje || null,
            descuento_fijo: descuento_fijo || null,
            fecha_inicio,
            fecha_fin
        });

        res.status(201).json({
            message: "¡Promoción creada correctamente!",
            promocion
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//actualizar una promocion
export const updatePromocion = async (req, res) => {
    const { id } = req.params;
    const { fecha_inicio, fecha_fin } = req.body;

    // Validar coherencia de fechas si se incluyen en la solicitud
    if (fecha_inicio && fecha_fin && new Date(fecha_inicio) > new Date(fecha_fin)) {
        return res.status(400).json({ message: "La fecha de inicio no puede ser posterior a la fecha de fin." });
    }

    try {
        const [updated] = await promocionesModel.update(req.body, {
            where: { id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Promoción no encontrada para actualizar" });
        }

        res.json({ message: "¡Promoción actualizada correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//eliminar una promocion
export const deletePromocion = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await promocionesModel.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Promoción no encontrada para eliminar" });
        }

        res.json({ message: "Promoción eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
