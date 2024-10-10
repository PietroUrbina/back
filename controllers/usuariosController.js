//importamos el Modelo
import usuariosModel from "../models/usuariosModel.js";
import empleadosModel from "../models/empleadosModel.js";

//**Métodos para el CRUD */

// Mostrar todos los usuarios
export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.findAll({
            include: [
                {
                    model: empleadosModel, // Hacemos el JOIN con empleados
                    attributes: ['nombre_empleado'], // Solo traemos el campo del nombre
                },
            ],
        });
        res.json(usuarios);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un Usuario
export const getUsuario = async (req, res) => {
    try {
        const usuario = await usuariosModel.findOne({
            where: { id: req.params.id }
        });
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un usuario
export const createUsuario = async (req, res) => {
    const { nombre_usuario, contrasena, rol, id_empleado } = req.body;  // Recibimos id_empleado desde el frontend
    
    // Verifica que el rol sea uno de los valores permitidos
    if (!['administrador', 'cajero', 'mozo'].includes(rol)) {
        return res.status(400).json({
            message: "El rol proporcionado no es válido."
        });
    }

    try {
        // Verificamos que el empleado existe usando el campo 'id' en la tabla de empleados
        const empleado = await empleadosModel.findOne({ where: { id: id_empleado } });
        if (!empleado) {
            return res.status(400).json({
                message: "El empleado proporcionado no es válido."
            });
        }

        // Creamos el usuario en la base de datos
        await usuariosModel.create({ nombre_usuario, contrasena, rol, id_empleado });
        res.json({
            message: "¡Usuario creado correctamente!"
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);  // Agregar más información del error
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    try {
        await usuariosModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            message: "¡Usuario actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        await usuariosModel.destroy({
            where: { id: req.params.id }
        });
        res.json({
            message: "Usuario eliminado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
