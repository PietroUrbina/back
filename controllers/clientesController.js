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
//crear un Cliente
export const createCliente = async (req, res) => {
    const { nombre, apellido, dni, email, telefono, direccion, fecha_nacimiento } = req.body;

    try {
        await clientesModel.create({ nombre, apellido, dni, email, telefono, direccion, fecha_nacimiento });
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