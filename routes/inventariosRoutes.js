import express from 'express';
import { createInventario, deleteInventario, getAllInventarios, getInventarioByProductoId,getInventarioById, updateInventario } from '../controllers/inventariosController.js';

const inventariosRoutes = express.Router();

inventariosRoutes.get('/',getAllInventarios);
inventariosRoutes.get('/producto/:id_producto', getInventarioByProductoId);
inventariosRoutes.get('/:id', getInventarioById);
inventariosRoutes.post('/',createInventario);
inventariosRoutes.put('/:id',updateInventario);
inventariosRoutes.delete('/:id',deleteInventario);


export default inventariosRoutes;