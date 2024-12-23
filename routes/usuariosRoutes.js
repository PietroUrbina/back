import express from 'express';
import { createUsuario, deleteUsuario, getAllUsuarios, getUsuario, updateUsuario, loginUsuario, checkUsuarioExistente, changePassword, recuperarUsuario } from '../controllers/usuariosController.js';

const usuariosRoutes = express.Router();

usuariosRoutes.get('/',getAllUsuarios);
usuariosRoutes.get('/:id',getUsuario);
usuariosRoutes.post('/',createUsuario);
usuariosRoutes.put('/:id',updateUsuario);
usuariosRoutes.delete('/:id',deleteUsuario);
usuariosRoutes.post('/login', loginUsuario);
usuariosRoutes.post('/check-usuario', checkUsuarioExistente);
usuariosRoutes.put('/change-password/:id', changePassword);
usuariosRoutes.post('/recuperar-usuario', recuperarUsuario);

export default usuariosRoutes;
