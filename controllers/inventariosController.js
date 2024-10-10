//importamos el Modelo
import inventariosModel from "../models/inventariosModel.js";

//**Metodos para el CRUD */

//Mostrar todos los Inventarios
export const getAllInventarios = async(req, res) => {
    try{
    const inventarios = await inventariosModel.findAll()
        res.json(inventarios)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un Inventario
export const getInventario = async (req, res)=> {
    try {
        const inventario = await inventariosModel.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(inventario);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear un inventario
export const createInventario = async (req, res) => {
    const { id_producto, tipo_movimiento, stock, unidad_medida, fecha_movimiento } = req.body;

    try {
        await inventariosModel.create({ id_producto, tipo_movimiento, stock, unidad_medida, fecha_movimiento });
        res.json({
            message: "¡Inventario creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un Inventario
export const updateInventario = async (req, res) =>{
    try {
        await inventariosModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"Inventario actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un Inventario
export const deleteInventario = async (req, res) =>{
    try {
        await inventariosModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Inventario eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}