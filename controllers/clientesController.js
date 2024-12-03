import { Op } from "sequelize"; // Importa los operadores de Sequelize
import clientesModel from "../models/clientesModel.js";

//**Métodos para el CRUD */

// Mostrar todos los Clientes
export const getAllClientes = async (req, res) => {
    try {
        const clientes = await clientesModel.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un Cliente
export const getCliente = async (req, res) => {
    try {
        const cliente = await clientesModel.findOne({
            where: { id: req.params.id }
        });
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Método para buscar clientes por DNI o nombre completo
export const searchClientes = async (req, res) => {
    const term = req.params.term;

    try {
        const clientes = await clientesModel.findAll({
            where: {
                [Op.or]: [
                    { dni: { [Op.like]: `%${term}%` } },
                    { nombre_completo: { [Op.like]: `%${term}%` } }
                ]
            }
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un Cliente
export const createCliente = async (req, res) => {
    const { id_empresa, tipo_cliente, dni, nombre_completo, direccion, email, telefono } = req.body;

    try {
        const cliente = await clientesModel.create({ id_empresa, tipo_cliente, dni, nombre_completo, direccion, email, telefono });
        res.json({
            message: "¡Cliente creado correctamente!",
            cliente
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un Cliente
export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await clientesModel.update(req.body, {
            where: { id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Cliente no encontrado para actualizar" });
        }

        res.json({
            message: "¡Cliente actualizado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un Cliente
export const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await clientesModel.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Cliente no encontrado para eliminar" });
        }

        res.json({
            message: "Cliente eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
