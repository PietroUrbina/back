import express from 'express';
import { crearInventario, getAllInventarios, getInventarioById, registrarMovimientoInventario,updateInventario, deleteInventario } from '../controllers/inventariosController.js';

const inventariosRoutes = express.Router();

inventariosRoutes.post('/', crearInventario);
inventariosRoutes.get('/', getAllInventarios);
inventariosRoutes.get('/:id', getInventarioById);
inventariosRoutes.post("/movimiento", registrarMovimientoInventario);
inventariosRoutes.put('/:id', updateInventario);
inventariosRoutes.delete('/:id', deleteInventario);

export default inventariosRoutes;
