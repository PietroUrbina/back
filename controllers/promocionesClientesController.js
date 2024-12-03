//importamos el Modelo
import promocionesClientesModel from "../models/promocionesClientesModel.js";

//**Metodos para el CRUD */

//Mostrar todas la promociones de los clientes
export const getAllPromocionesClientes = async (req, res) => {
    try {
        const promocionesClientes = await promocionesClientesModel.findAll({
            include: [
                { model: clientesModel, attributes: ['nombre_completo', 'dni'] },
                { model: promocionesModel, attributes: ['nombre_promocion', 'descripcion'] }
            ]
        });
        res.json(promocionesClientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Mostrar una promocion del cliente
export const getPromocionCliente = async (req, res) => {
    try {
        const promocionCliente = await promocionesClientesModel.findOne({
            where: { id: req.params.id },
            include: [
                { model: clientesModel, attributes: ['nombre_completo', 'dni'] },
                { model: promocionesModel, attributes: ['nombre_promocion', 'descripcion'] }
            ]
        });

        if (!promocionCliente) {
            return res.status(404).json({ message: "Promoción del cliente no encontrada" });
        }

        res.json(promocionCliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//crear una promocion del cliente
export const createPromocionCliente = async (req, res) => {
    const { id_cliente, id_promocion, fecha_aplicacion } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!id_cliente || !id_promocion || !fecha_aplicacion) {
        return res.status(400).json({ message: "Todos los campos son obligatorios: id_cliente, id_promocion, fecha_aplicacion." });
    }

    try {
        // Verificar que el cliente exista
        const cliente = await clientesModel.findByPk(id_cliente);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        // Verificar que la promoción exista
        const promocion = await promocionesModel.findByPk(id_promocion);
        if (!promocion) {
            return res.status(404).json({ message: "Promoción no encontrada" });
        }

        // Crear la promoción del cliente
        const nuevaPromocionCliente = await promocionesClientesModel.create({ id_cliente, id_promocion, fecha_aplicacion });
        res.status(201).json({
            message: "¡Promoción del cliente creada correctamente!",
            promocionCliente: nuevaPromocionCliente
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//actualizar una promocion del cliente
export const updatePromocionCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_cliente, id_promocion } = req.body;

        // Validar relaciones si se incluyen en la solicitud
        if (id_cliente) {
            const cliente = await clientesModel.findByPk(id_cliente);
            if (!cliente) {
                return res.status(404).json({ message: "Cliente no encontrado" });
            }
        }

        if (id_promocion) {
            const promocion = await promocionesModel.findByPk(id_promocion);
            if (!promocion) {
                return res.status(404).json({ message: "Promoción no encontrada" });
            }
        }

        const [updated] = await promocionesClientesModel.update(req.body, {
            where: { id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Promoción del cliente no encontrada para actualizar" });
        }

        res.json({ message: "Promoción del cliente actualizada correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//eliminar una promocion del cliente
export const deletePromocionCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await promocionesClientesModel.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Promoción del cliente no encontrada para eliminar" });
        }

        res.json({ message: "Promoción del cliente eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};