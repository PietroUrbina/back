//importamos el Modelo
import ventasModel from "../models/ventasModel.js";

//**Metodos para el CRUD */

//Mostrar todas las ventas
export const getAllVentas = async(req, res) => {
    try{
    const ventas = await ventasModel.findAll()
        res.json(ventas)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar una venta
export const getVenta= async (req, res)=> {
    try {
        const venta = await ventasModel.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(venta);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear una venta
export const createVenta = async (req, res) => {
    const { id_usuario, id_cliente, total, metodo_pago, comprobante, tipo_comprobante, fecha_emision, estado } = req.body;

    try {
        await ventasModel.create({ id_usuario, id_cliente, total, metodo_pago, comprobante, tipo_comprobante, fecha_emision, estado  });
        res.json({
            message: "Venta creada correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar una venta
export const updateVenta = async (req, res) =>{
    try {
        await ventasModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"Venta actualizada correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar una Venta
export const deleteVenta = async (req, res) =>{
    try {
        await ventasModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Venta eliminada correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}