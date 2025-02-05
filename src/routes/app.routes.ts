import { Router } from "express";

import organizacionRouter from "./organizacion.routes.js";
import clienteRouter from "./cliente.routes.js";

const router = Router();

router.use("/organizaciones", organizacionRouter);
router.use("/clientes", clienteRouter);

export default router;