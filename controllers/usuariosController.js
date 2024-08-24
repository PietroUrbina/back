//importamos el Modelo
import usuariosModel from "../models/usuariosModel.js";

//**Metodos para el CRUD */

//Mostrar todos los usuarios
export const getAllUsuarios = async(req, res) => {
    try{
    const usuarios = await usuariosModel.findAll()
        res.json(usuarios)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un Usuario
export const getUsuario = async (req, res)=> {
    try {
        const usuario = await usuariosModel.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(usuario);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear un usuario
// usuariosController.js
export const createUsuario = async (req, res) => {
    const { nombre_usuario, contrasena, rol } = req.body;
    
    // Verifica que el rol sea uno de los valores permitidos
    if (!['administrador', 'cajero', 'mozo'].includes(rol)) {
        return res.status(400).json({
            message: "El rol proporcionado no es válido."
        });
    }

    try {
        await usuariosModel.create({ nombre_usuario, contrasena, rol });
        res.json({
            message: "¡Usuario creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un usuario
export const updateUsuario = async (req, res) =>{
    try {
        await usuariosModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"¡usuario actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un usuario
export const deleteUsuario = async (req, res) =>{
    try {
        await usuariosModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Usuario eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}