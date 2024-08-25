//importamos el Modelo
import reservasModel from "../models/reservasModel.js";

//**Metodos para el CRUD */

//Mostrar todos las Reservas
export const getAllReservas = async(req, res) => {
    try{
    const reservas = await reservasModel.findAll()
        res.json(reservas)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar una reserva
export const getReserva = async (req, res)=> {
    try {
        const reserva = await reservasModel.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(reserva);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear una Reserva
export const createReserva = async (req, res) => {
    const { id_cliente, fecha_reserva, hora_inicio, hora_fin, estado } = req.body;

    try {
        await reservasModel.create({ id_cliente, fecha_reserva, hora_inicio, hora_fin, estado });
        res.json({
            message: "Reserva creada correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar una Reserva
export const updateReserva= async (req, res) =>{
    try {
        await reservasModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"¡Reserva actualizada correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar una Reserva
export const deleteReserva = async (req, res) =>{
    try {
        await reservasModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Reserva eliminada correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}