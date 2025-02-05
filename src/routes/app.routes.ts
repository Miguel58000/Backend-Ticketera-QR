import { Router } from "express";

import organizacionRouter from "./organizacion.routes.js";
import clienteRouter from "./cliente.routes.js";
import politicaRouter from "./politica.routes.js";
import categoriaRouter from "./categoria.routes.js";

const router = Router();

router.use("/organizaciones", organizacionRouter);
router.use("/clientes", clienteRouter);
router.use("/politicas", politicaRouter);
router.use("/categorias", categoriaRouter);

export default router;