//importamos el Modelo
import promocionesModel from "../models/promocionesModel.js";

//**Metodos para el CRUD */

//Mostrar todas las promociones
export const getAllPromociones = async(req, res) => {
    try{
    const promociones = await promocionesModel.findAll()
        res.json(promociones)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar una promocion
export const getPromocion= async (req, res)=> {
    try {
        const promocion = await promocionesModel.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(promocion);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear una promocion
export const createPromocion = async (req, res) => {
    const { nombre_promocion, descripcion, fecha_inicio, fecha_fin, descuento } = req.body;

    try {
        await promocionesModel.create({ nombre_promocion, descripcion, fecha_inicio, fecha_fin, descuento });
        res.json({
            message: "Promocion creada correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar una promocion
export const updatePromocion = async (req, res) =>{
    try {
        await promocionesModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"Promocion actualizada correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar una promocion
export const deletePromocion = async (req, res) =>{
    try {
        await promocionesModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Promocion eliminada correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}