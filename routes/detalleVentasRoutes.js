import express from 'express';
import { createDetalleVenta, deleteDetalleVenta, getAllDetallesVentas, getDetalleVenta, updateDetalleVenta } from '../controllers/detalleVentasController.js';

const detalleVentasRoutes = express.Router();

detalleVentasRoutes.get('/',getAllDetallesVentas);
detalleVentasRoutes.get('/:id',getDetalleVenta);
detalleVentasRoutes.post('/',createDetalleVenta);
detalleVentasRoutes.put('/:id',updateDetalleVenta);
detalleVentasRoutes.delete('/:id',deleteDetalleVenta);

export default detalleVentasRoutes;