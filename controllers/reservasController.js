//importamos el Modelo
import reservasModel from "../models/reservasModel.js";

//**Metodos para el CRUD */

//Mostrar todos las Reservas
export const getAllReservas = async (req, res) => {
    try {
        const reservas = await reservasModel.findAll({
            include: [
                { model: clientesModel, attributes: ['nombre_completo', 'dni'] },
                { model: usuariosModel, attributes: ['nombre_usuario'] }
            ]
        });
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Mostrar una reserva
export const getReserva = async (req, res) => {
    try {
        const reserva = await reservasModel.findOne({
            where: { id: req.params.id },
            include: [
                { model: clientesModel, attributes: ['nombre_completo', 'dni'] },
                { model: usuariosModel, attributes: ['nombre_usuario'] }
            ]
        });

        if (!reserva) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        res.json(reserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//crear una Reserva
export const createReserva = async (req, res) => {
    const { id_cliente, fecha_reserva, num_personas, estado, id_usuario, fecha_creacion } = req.body;

    // Validar campos obligatorios
    if (!id_cliente || !fecha_reserva || !num_personas || !estado || !id_usuario || !fecha_creacion) {
        return res.status(400).json({ message: "Todos los campos obligatorios deben estar presentes." });
    }

    // Validar fecha de reserva
    if (new Date(fecha_reserva) < new Date()) {
        return res.status(400).json({ message: "La fecha de reserva no puede estar en el pasado." });
    }

    try {
        // Verificar que el cliente exista
        const cliente = await clientesModel.findByPk(id_cliente);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        // Verificar que el usuario exista
        const usuario = await usuariosModel.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Crear la reserva
        const reserva = await reservasModel.create({
            id_cliente,
            fecha_reserva,
            num_personas,
            estado,
            id_usuario,
            fecha_creacion: new Date()
        });

        res.status(201).json({
            message: "Reserva creada correctamente!",
            reserva
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//actualizar una Reserva
export const updateReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_reserva } = req.body;

        // Validar fecha de reserva si está presente
        if (fecha_reserva && new Date(fecha_reserva) < new Date()) {
            return res.status(400).json({ message: "La fecha de reserva no puede estar en el pasado." });
        }

        const [updated] = await reservasModel.update(req.body, {
            where: { id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Reserva no encontrada para actualizar" });
        }

        res.json({ message: "¡Reserva actualizada correctamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//eliminar una Reserva
export const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await reservasModel.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Reserva no encontrada para eliminar" });
        }

        res.json({ message: "Reserva eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
