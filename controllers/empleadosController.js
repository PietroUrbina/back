//importamos el Modelo
import empleadosModel from "../models/empleadosModel.js"
import usuariosModel from "../models/usuariosModel.js"

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
    const { dni, nombre_empleado, apellido_empleado, direccion, telefono, email, fecha_contratacion } = req.body;
    
    try {
        await empleadosModel.create({ dni, nombre_empleado, apellido_empleado, direccion, telefono, email, fecha_contratacion });
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

// Eliminar un Empleado y su usuario asociado
export const deleteEmpleado = async (req, res) => {
    try {
        // Buscar el empleado por su ID
        const empleado = await empleadosModel.findByPk(req.params.id);

        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        // Buscar y eliminar el usuario asociado al empleado, si existe
        const usuario = await usuariosModel.findOne({ where: { id_empleado: empleado.id } });
        if (usuario) {
            await usuario.destroy();
        }

        // Eliminar el empleado
        await empleado.destroy();

        res.json({
            message: 'Empleado y su usuario asociados han sido eliminados correctamente'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};