import express from 'express';
import { createDetalleReserva, deleteDetalleReserva, getAllDetalleReservas, getDetalleReserva, updateDetalleReserva } from '../controllers/detalleReservasController.js';

const detalleReservasRoutes = express.Router();

detalleReservasRoutes.get('/',getAllDetalleReservas);
detalleReservasRoutes.get('/:id',getDetalleReserva);
detalleReservasRoutes.post('/',createDetalleReserva);
detalleReservasRoutes.put('/:id',updateDetalleReserva);
detalleReservasRoutes.delete('/:id',deleteDetalleReserva);

export default detalleReservasRoutes;