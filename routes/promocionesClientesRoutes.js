import express from 'express';
import { createPromocionCliente, deletePromocionCliente, getAllPromocionesClientes, getPromocionCliente, updatePromocionCliente } from '../controllers/promocionesClientesController.js';

const promocionesClientesRoutes = express.Router();

promocionesClientesRoutes.get('/',getAllPromocionesClientes);
promocionesClientesRoutes.get('/:id',getPromocionCliente);
promocionesClientesRoutes.post('/',createPromocionCliente);
promocionesClientesRoutes.put('/:id',updatePromocionCliente);
promocionesClientesRoutes.delete('/:id',deletePromocionCliente);

export default promocionesClientesRoutes;