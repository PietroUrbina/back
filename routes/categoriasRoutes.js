import express from 'express';
import { createCategoria, deleteCategoria, getAllCategorias, getCategoria, updateCategoria } from '../controllers/categoriasController.js';

const categoriasRoutes = express.Router();

categoriasRoutes.get('/',getAllCategorias);
categoriasRoutes.get('/:id',getCategoria);
categoriasRoutes.post('/',createCategoria);
categoriasRoutes.put('/:id',updateCategoria);
categoriasRoutes.delete('/:id',deleteCategoria);

export default categoriasRoutes;