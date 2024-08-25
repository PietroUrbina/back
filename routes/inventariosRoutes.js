import express from 'express';
import { createInventario, deleteInventario, getAllInventarios, getInventario, updateInventario } from '../controllers/inventariosController.js';

const inventariosRoutes = express.Router();

inventariosRoutes.get('/',getAllInventarios);
inventariosRoutes.get('/:id',getInventario);
inventariosRoutes.post('/',createInventario);
inventariosRoutes.put('/:id',updateInventario);
inventariosRoutes.delete('/:id',deleteInventario);

export default inventariosRoutes;