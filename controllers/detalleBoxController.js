//importamos el Modelo
import detalleBoxModel from "../models/detalleBoxModel.js";

//**Metodos para el CRUD */

//Mostrar todos los DetallesBox
export const getAllDetallesBox = async(req, res) => {
    try{
    const detalleBoxs = await detalleBoxModel.findAll()
        res.json(detalleBoxs)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un detalleBox
export const getDetalleBox = async (req, res)=> {
    try {
        const detallebox = await detalleBoxModel.findOne({
            where:{ 
                id:req.params.id
            }
        });
        res.json(detallebox);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear un detalleBox
export const createDetalleBox = async (req, res) => {
    const { id_box, id_producto, cantidad_minima, observaciones } = req.body;

    try {
        await detalleBoxModel.create({ id_box, id_producto, cantidad_minima, observaciones });
        res.json({
            message: "¡DetalleBox creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un detalleBox
export const updateDetalleBox = async (req, res) =>{
    try {
        await detalleBoxModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"¡DetalleBox actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un detalleBox
export const deleteDetalleBox = async (req, res) =>{
    try {
        await detalleBoxModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"¡DetalleBox eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}