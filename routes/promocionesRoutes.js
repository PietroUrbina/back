import express from 'express';
import { createPromocion, deletePromocion, getAllPromociones, getPromocion, updatePromocion } from '../controllers/promocionesController.js';

const promocionesRoutes = express.Router();

promocionesRoutes.get('/',getAllPromociones);
promocionesRoutes.get('/:id',getPromocion);
promocionesRoutes.post('/',createPromocion);
promocionesRoutes.put('/:id',updatePromocion);
promocionesRoutes.delete('/:id',deletePromocion);

export default promocionesRoutes;