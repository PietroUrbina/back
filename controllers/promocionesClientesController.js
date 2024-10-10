//importamos el Modelo
import promocionesClientesModel from "../models/promocionesClientesModel.js";

//**Metodos para el CRUD */

//Mostrar todas la promociones de los clientes
export const getAllPromocionesClientes = async(req, res) => {
    try{
    const promocionesClientes = await promocionesClientesModel.findAll()
        res.json(promocionesClientes)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar una promocion del cliente
export const getPromocionCliente = async (req, res)=> {
    try {
        const promocionesCliente = await promocionesClientesModel.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(promocionesCliente);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear una promocion del cliente
export const createPromocionCliente = async (req, res) => {
    const { id_cliente, id_promocion, fecha_aplicacion } = req.body;

    try {
        await promocionesClientesModel.create({ id_cliente, id_promocion, fecha_aplicacion });
        res.json({
            message: "¡PromocionCliente creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar una promocion del cliente
export const updatePromocionCliente = async (req, res) =>{
    try {
        await promocionesClientesModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message": "Promocion del cliente actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar una promocion del cliente
export const deletePromocionCliente = async (req, res) =>{
    try {
        await promocionesClientesModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Promocion del cliente eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}