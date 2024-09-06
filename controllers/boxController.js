//importamos el Modelo
import boxModel from "../models/boxModel.js"

//**Metodos para el CRUD */

//Mostrar todos los box
export const getAllBox = async(req, res) => {
    try{
    const box = await boxModel.findAll()
        res.json(box)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un box
export const getBox = async (req, res)=> {
    try {
        const box = await boxModel.findOne({
            where:{ 
                id:req.params.id
            }
        });
        res.json(box);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear un box
export const createBox = async (req, res) => {
    const { nombre_box, capacidad} = req.body;
    
    try {
        await boxModel.create({ nombre_box, capacidad });
        res.json({
            message: "¡Box creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un Box
export const updateBox = async (req, res) =>{
    try {
        await boxModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"¡Box actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un Box
export const deleteBox = async (req, res) =>{
    try {
        await boxModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Box eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}