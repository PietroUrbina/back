import express from 'express';
import { createProducto, deleteProducto, getAllProductos, getProductosConInventario, getProducto, updateProducto } from '../controllers/productosController.js';

const productosRoutes = express.Router();

productosRoutes.get('/',getAllProductos);
productosRoutes.get('/con-inventario', getProductosConInventario);
productosRoutes.get('/:id',getProducto);
productosRoutes.post('/',createProducto);
productosRoutes.put('/:id',updateProducto);
productosRoutes.delete('/:id',deleteProducto);


export default productosRoutes;