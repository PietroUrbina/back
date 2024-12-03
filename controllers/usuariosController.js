//importamos el Modelo
import usuariosModel from "../models/usuariosModel.js";
import empleadosModel from "../models/empleadosModel.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Login de usuario
export const loginUsuario = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
      const usuario = await usuariosModel.findOne({ where: { nombre_usuario } });

      if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
          { id: usuario.id, nombre_usuario: usuario.nombre_usuario, rol: usuario.rol },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.json({
          message: "Login exitoso",
          token,
          usuario: {
              id: usuario.id,
              nombre_usuario: usuario.nombre_usuario,
              rol: usuario.rol
          }
      });
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
                    attributes: ['nombre_completo'],  // Incluir solo el nombre del empleado
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
  const {  id_empleado, nombre_usuario, contrasena, rol } = req.body;

  if (!id_empleado || !nombre_usuario || !contrasena || !rol) {
      return res.status(400).json({ message: "Todos los campos son obligatorios: nombre_usuario, contrasena, rol, id_empleado." });
  }

  if (!['Administrador', 'Cajero', 'Mozo'].includes(rol)) {
      return res.status(400).json({ message: "El rol proporcionado no es válido." });
  }

  try {
      const usuarioExistente = await usuariosModel.findOne({ where: { nombre_usuario } });
      if (usuarioExistente) {
          return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
      }

      const empleado = await empleadosModel.findByPk(id_empleado);
      if (!empleado) {
          return res.status(404).json({ message: "Empleado no encontrado." });
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const nuevoUsuario = await usuariosModel.create({
          nombre_usuario,
          contrasena: hashedPassword,
          rol,
          id_empleado
      });

      res.status(201).json({ message: "¡Usuario creado correctamente!", usuario: nuevoUsuario });
  } catch (error) {
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
  const { nuevaContrasena } = req.body;

  if (!nuevaContrasena || nuevaContrasena.length < 10) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 10 caracteres." });
  }

  try {
      const usuario = await usuariosModel.findByPk(id);
      if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado." });
      }

      const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
      await usuariosModel.update({ contrasena: hashedPassword }, { where: { id } });

      res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


//Recuperacion de contraseña desde el login
// Lógica para enviar correo y cambiar contraseña
export const recuperarUsuario = async (req, res) => {
  const { correo } = req.body;

  try {
      const empleado = await empleadosModel.findOne({ where: { email: correo } });
      if (!empleado) {
          return res.status(404).json({ message: "Correo no encontrado." });
      }

      const usuario = await usuariosModel.findOne({ where: { id_empleado: empleado.id } });
      if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado." });
      }

      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });

      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: correo,
          subject: "Recuperación de cuenta",
          text: `Hola ${empleado.nombre_completo},\n\nTu usuario es: ${usuario.nombre_usuario}\nRecupera tu contraseña en el siguiente enlace: http://localhost:3000/reset-password/${usuario.id}`
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Correo enviado con éxito." });
  } catch (error) {
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
