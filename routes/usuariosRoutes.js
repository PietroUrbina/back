import express from 'express';
import { createUsuario, deleteUsuario, getAllUsuarios, getUsuario, updateUsuario } from '../controllers/usuariosController.js';

const usuariosRoutes = express.Router();

usuariosRoutes.get('/',getAllUsuarios);
usuariosRoutes.get('/:id',getUsuario);
usuariosRoutes.post('/',createUsuario);
usuariosRoutes.put('/:id',updateUsuario);
usuariosRoutes.delete('/:id',deleteUsuario);

export default usuariosRoutes;
