//importamos el Modelo
import detalleVentasModel from "../models/detalleVentasModel.js";

//**Metodos para el CRUD */

//Mostrar todos los Detalles Ventas
export const getAllDetallesVentas = async(req, res) => {
    try{
    const detalleVentas = await detalleVentasModel.findAll()
        res.json(detalleVentas)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un Detalle Venta
export const getDetalleVenta = async (req, res)=> {
    try {
        const detalleVenta = await detalleVentasModel.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(detalleVenta);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear un Detalle Venta
export const createDetalleVenta = async (req, res) => {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;

    try {
        await detalleVentasModel.create({ id_venta, id_producto, cantidad, precio_unitario });
        res.json({
            message: "¡Detalle Venta creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un Detalle Venta
export const updateDetalleVenta = async (req, res) =>{
    try {
        await detalleVentasModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"Detalle Venta actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un Detalle Venta
export const deleteDetalleVenta = async (req, res) =>{
    try {
        await detalleVentasModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Detalle Venta eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}