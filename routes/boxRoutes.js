import express from 'express';
import { createBox, deleteBox, getAllBox, getBox, updateBox } from '../controllers/boxController.js';

const boxRoutes = express.Router();

boxRoutes.get('/',getAllBox);
boxRoutes.get('/:id',getBox);
boxRoutes.post('/',createBox);
boxRoutes.put('/:id',updateBox);
boxRoutes.delete('/:id',deleteBox);

export default boxRoutes;