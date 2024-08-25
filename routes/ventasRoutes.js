import express from 'express';
import { createVenta, deleteVenta, getAllVentas, getVenta, updateVenta } from '../controllers/ventasController.js';

const ventasRoutes = express.Router();

ventasRoutes.get('/',getAllVentas);
ventasRoutes.get('/:id',getVenta);
ventasRoutes.post('/',createVenta);
ventasRoutes.put('/:id',updateVenta);
ventasRoutes.delete('/:id',deleteVenta);

export default ventasRoutes;