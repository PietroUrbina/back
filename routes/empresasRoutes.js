import express from 'express';
import {createEmpresa, deleteEmpresa, getAllEmpresas, getEmpresa, updateEmpresa} from '../controllers/empresasController.js';
import { obtenerDatosEmpresa } from '../controllers/reniecController.js';

const empresasRoutes = express.Router();

empresasRoutes.get('/', getAllEmpresas);
empresasRoutes.get('/:id', getEmpresa);
empresasRoutes.post('/', createEmpresa);
empresasRoutes.put('/:id', updateEmpresa);
empresasRoutes.delete('/:id', deleteEmpresa);

// Integración con SUNAT para obtener datos por RUC
empresasRoutes.post('/sunat', obtenerDatosEmpresa);

export default empresasRoutes;
