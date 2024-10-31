import { Op } from "sequelize"; // Importa los operadores de Sequelize
//importamos el Modelo
import clientesModel from "../models/clientesModel.js";

//**Metodos para el CRUD */

//Mostrar todos los Clientes
export const getAllClientes = async(req, res) => {
    try{
    const clientes = await clientesModel.findAll()
        res.json(clientes)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un Cliente
export const getCliente = async (req, res)=> {
    try {
        const cliente = await clientesModel.findOne({
            where:{ 
                id:req.params.id
            }
        });
        res.json(cliente);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}

// Método para buscar clientes por DNI, nombre o apellido
export const searchClientes = async (req, res) => {
    const term = req.params.term;

    try {
        const clientes = await clientesModel.findAll({
            where: {
                [Op.or]: [
                    { dni: { [Op.like]: `%${term}%` } },
                    { nombre: { [Op.like]: `%${term}%` } },
                    { apellido: { [Op.like]: `%${term}%` } }
                ]
            }
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//crear un Cliente
export const createCliente = async (req, res) => {
    const { dni, nombre, apellido, direccion, email, telefono, fecha_nacimiento, sexo } = req.body;

    try {
        await clientesModel.create({ dni, nombre, apellido, direccion, email, telefono, fecha_nacimiento, sexo });
        res.json({
            message: "¡Cliente creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un Cliente
export const updateCliente = async (req, res) =>{
    try {
        await clientesModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"¡cliente actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un Cliente
export const deleteCliente = async (req, res) =>{
    try {
        await clientesModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Cliente eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}