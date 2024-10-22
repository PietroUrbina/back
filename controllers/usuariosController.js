//importamos el Modelo
import usuariosModel from "../models/usuariosModel.js";
import empleadosModel from "../models/empleadosModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Login de usuario
export const loginUsuario = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    try {
        // Buscar el usuario por nombre
        const usuario = await usuariosModel.findOne({
            where: { nombre_usuario }   
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña en texto plano con la encriptada
        const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: usuario.id, nombre_usuario: usuario.nombre_usuario, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  // Token expira en 1 hora
        );

        res.json({ message: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//**Métodos para el CRUD */

// Mostrar todos los usuarios
export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.findAll({
            attributes: { exclude: ['contrasena'] },  // No devolver la contraseña
            include: [
                {
                    model: empleadosModel, 
                    attributes: ['nombre_empleado'],  // Incluir solo el nombre del empleado
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
    const { nombre_usuario, contrasena, rol, id_empleado } = req.body;
  
    // Verificar que los datos lleguen correctamente
    console.log('Datos recibidos en el servidor:', req.body);
  
    if (!['Administrador', 'Cajero', 'Mozo'].includes(rol)) {
      return res.status(400).json({
        message: "El rol proporcionado no es válido."
      });
    }
  
    try {
      // Verificar si el nombre de usuario ya existe
      const usuarioExistente = await usuariosModel.findOne({ where: { nombre_usuario } });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
      }
  
      // Verificar que el empleado existe
      const empleado = await empleadosModel.findOne({ where: { id: id_empleado } });
      if (!empleado) {
        return res.status(400).json({
          message: "El empleado proporcionado no es válido."
        });
      }
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);
  
      // Crear el usuario
      const nuevoUsuario = await usuariosModel.create({
        nombre_usuario,
        contrasena: hashedPassword,
        rol,
        id_empleado
      });
  
      // Respuesta exitosa
      res.json({ message: "¡Usuario creado correctamente!", usuario: nuevoUsuario });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ message: error.message });
    }
  };  

// Verificar si un nombre de usuario ya existe
export const checkUsuarioExistente = async (req, res) => {
    const { nombre_usuario } = req.body; // Tomar el nombre de usuario desde el cuerpo de la solicitud

    try {
        const usuarioExistente = await usuariosModel.findOne({
            where: { nombre_usuario }
        });

        if (usuarioExistente) {
            // Si existe, devuelve un error con mensaje
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
        }

        // Si no existe, devolver un mensaje de que está disponible
        res.status(200).json({ message: 'El nombre de usuario está disponible.' });
    } catch (error) {
        console.error('Error al verificar nombre de usuario:', error);
        res.status(500).json({ message: error.message });
    }
};

// Lógica para cambiar la contraseña
export const changePassword = async (req, res) => {
    const { id } = req.params;
    const { contrasena } = req.body;

    if (!contrasena || contrasena.length < 10) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 10 caracteres' });
    }

    try {
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        await usuariosModel.update({ contrasena: hashedPassword }, { where: { id } });

        res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
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
