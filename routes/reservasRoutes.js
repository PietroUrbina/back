import express from 'express';
import { createReserva, deleteReserva, getAllReservas, getReserva, updateReserva} from '../controllers/reservasController.js';

const reservasRoutes = express.Router();

reservasRoutes.get('/',getAllReservas);
reservasRoutes.get('/:id',getReserva);
reservasRoutes.post('/',createReserva);
reservasRoutes.put('/:id',updateReserva);
reservasRoutes.delete('/:id',deleteReserva);

export default reservasRoutes;