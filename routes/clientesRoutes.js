import express from 'express';
import { createCliente, deleteCliente, getAllClientes, getCliente, updateCliente, searchClientes } from '../controllers/clientesController.js';
import { obtenerDatosPersona } from '../controllers/reniecController.js';

const clientesRoutes = express.Router();

clientesRoutes.get('/',getAllClientes);
clientesRoutes.get('/search/:term', searchClientes); // Ruta para búsqueda por término
clientesRoutes.get('/:id',getCliente);
clientesRoutes.post('/',createCliente);
clientesRoutes.put('/:id',updateCliente);
clientesRoutes.delete('/:id',deleteCliente);
clientesRoutes.post('/reniec', obtenerDatosPersona);

export default clientesRoutes;
