//importamos el Modelo
import empleadosModel from "../models/empleadosModel.js"

//**Metodos para el CRUD */

//Mostrar todos los empleados
export const getAllEmpleados = async(req, res) => {
    try{
    const empleados = await empleadosModel.findAll()
        res.json(empleados)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un empleado
export const getEmpleado = async (req, res)=> {
    try {
        const empleado = await empleadosModel.findOne({
            where:{ 
                id:req.params.id
            }
        });
        res.json(empleado);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear un empleado
export const createEmpleado = async (req, res) => {
    const { nombre_empleado, direccion, telefono, email, fecha_contratacion } = req.body;
    
    try {
        await empleadosModel.create({ nombre_empleado, direccion, telefono, email, fecha_contratacion });
        res.json({
            message: "¡Empleado creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un Empleado
export const updateEmpleado = async (req, res) =>{
    try {
        await empleadosModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"¡Empleado actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un Empleado
export const deleteEmpleado = async (req, res) =>{
    try {
        await empleadosModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Empleado eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}