import express from 'express';
import { createDetalleBox, deleteDetalleBox, getAllDetallesBox, getDetalleBox, updateDetalleBox } from '../controllers/detalleBoxController.js';

const detalleBoxRoutes = express.Router();

detalleBoxRoutes.get('/',getAllDetallesBox);
detalleBoxRoutes.get('/:id',getDetalleBox);
detalleBoxRoutes.post('/',createDetalleBox);
detalleBoxRoutes.put('/:id',updateDetalleBox);
detalleBoxRoutes.delete('/:id',deleteDetalleBox);

export default detalleBoxRoutes;