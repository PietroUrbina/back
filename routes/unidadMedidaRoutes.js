import { Router } from "express";
import { getAllUnidadesMedida, getUnidadMedida, createUnidadMedida, updateUnidadMedida, deleteUnidadMedida } from "../controllers/unidadMedidaController.js";

const unidadMedidaRoutes = Router();

unidadMedidaRoutes.get("/", getAllUnidadesMedida);
unidadMedidaRoutes.get("/:id", getUnidadMedida);
unidadMedidaRoutes.post("/", createUnidadMedida);
unidadMedidaRoutes.put("/:id", updateUnidadMedida);
unidadMedidaRoutes.delete("/:id", deleteUnidadMedida);

export default unidadMedidaRoutes;
