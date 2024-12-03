//importamos el Modelo
import detalleReservasModel from "../models/detalleReservasModel.js";

//**Metodos para el CRUD */

//Mostrar todos los detalles de la reserva
export const getAllDetalleReservas = async(req, res) => {
    try{
    const detalleReservas = await detalleReservasModel.findAll()
        res.json(detalleReservas)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un detalleReserva
export const getDetalleReserva = async (req, res)=> {
    try {
        const detalleReserva = await detalleReservasModel.findOne({
            where:{ 
                id:req.params.id
            }
        });
        res.json(detalleReserva);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear un nuevo detalle reserva
export const createDetalleReserva = async (req, res) => {
    const { id_reserva, id_box, disponibilidad } = req.body;

    try {
        await detalleReservasModel.create({ id_reserva, id_box, disponibilidad });
        res.json({
            message: "¡Detalle Reserva creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un Cliente
export const updateDetalleReserva = async (req, res) =>{
    try {
        await detalleReservasModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"¡Detalle Reserva actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un Detalle Reserva
export const deleteDetalleReserva = async (req, res) =>{
    try {
        await detalleReservasModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Detalle Reserva eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}