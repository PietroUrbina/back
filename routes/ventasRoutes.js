import express from 'express';
import { cancelVenta, createVenta, deleteVenta, getAllVentas, updateVenta } from '../controllers/ventasController.js';

const ventasRoutes = express.Router();
ventasRoutes.get('/',getAllVentas);
ventasRoutes.get('/cancelar',cancelVenta);
ventasRoutes.post('/',createVenta);
ventasRoutes.put('/:id',updateVenta);
ventasRoutes.delete('/:id',deleteVenta);

export default ventasRoutes;