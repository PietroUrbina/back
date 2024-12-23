import { Router } from "express";
import { getAllProductosCombo, getProductosByCombo, createProductoCombo, updateProductoCombo, deleteProductoCombo } from "../controllers/productosCombosController.js";

const productosCombosRoutes = Router();

productosCombosRoutes.get("/", getAllProductosCombo);
productosCombosRoutes.get("/:id", getProductosByCombo);
productosCombosRoutes.post("/", createProductoCombo);
productosCombosRoutes.put("/:id", updateProductoCombo);
productosCombosRoutes.delete("/:id", deleteProductoCombo);

export default productosCombosRoutes;