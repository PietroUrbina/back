import express from 'express';
import { createCliente, deleteCliente, getAllClientes, getCliente, updateCliente } from '../controllers/clientesController.js';
import { obtenerDatosCliente } from '../controllers/reniecController.js';

const clientesRoutes = express.Router();

clientesRoutes.get('/',getAllClientes);
clientesRoutes.get('/:id',getCliente);
clientesRoutes.post('/',createCliente);
clientesRoutes.put('/:id',updateCliente);
clientesRoutes.delete('/:id',deleteCliente);
clientesRoutes.post('/reniec', obtenerDatosCliente);

export default clientesRoutes;
