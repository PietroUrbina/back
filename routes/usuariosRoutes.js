import express from 'express';
import { createUsuario, deleteUsuario, getAllUsuarios, getUsuario, updateUsuario, loginUsuario } from '../controllers/usuariosController.js';

const usuariosRoutes = express.Router();

usuariosRoutes.get('/',getAllUsuarios);
usuariosRoutes.get('/:id',getUsuario);
usuariosRoutes.post('/',createUsuario);
usuariosRoutes.put('/:id',updateUsuario);
usuariosRoutes.delete('/:id',deleteUsuario);
usuariosRoutes.post('/login', loginUsuario);

export default usuariosRoutes;
