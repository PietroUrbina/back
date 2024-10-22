import express from 'express';
import { createEmpleado, deleteEmpleado, getAllEmpleados, getEmpleado, updateEmpleado } from '../controllers/empleadosController.js';
import { obtenerDatosPersona } from '../controllers/reniecController.js';

const empleadosRoutes = express.Router();

empleadosRoutes.get('/',getAllEmpleados);
empleadosRoutes.get('/:id',getEmpleado);
empleadosRoutes.post('/',createEmpleado);
empleadosRoutes.put('/:id',updateEmpleado);
empleadosRoutes.delete('/:id',deleteEmpleado);
empleadosRoutes.post('/reniec', obtenerDatosPersona);

export default empleadosRoutes;