import express from 'express';
import {createCliente, deleteCliente, getAllClientes, getCliente, updateCliente, searchClientes} from '../controllers/clientesController.js';
import { obtenerDatosPersona } from '../controllers/reniecController.js';

const clientesRoutes = express.Router();

// CRUD de clientes
clientesRoutes.get('/', getAllClientes);
clientesRoutes.get('/search/:term', searchClientes);
clientesRoutes.get('/:id', getCliente);
clientesRoutes.post('/', createCliente);
clientesRoutes.put('/:id', updateCliente);
clientesRoutes.delete('/:id', deleteCliente);

// Integración con RENIEC para obtener datos por DNI
clientesRoutes.post('/reniec', obtenerDatosPersona);

export default clientesRoutes;
