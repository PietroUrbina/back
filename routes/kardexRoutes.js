import express from 'express';
import { obtenerKardexInventario, registrarMovimientoDirectoKardex } from '../controllers/kardexController.js';

const kardexRoutes = express.Router();

kardexRoutes.get('/:id_inventario', obtenerKardexInventario);
kardexRoutes.post('/registro', registrarMovimientoDirectoKardex);

export default kardexRoutes;