import { Router } from "express";

import organizacionRouter from "./organizacion.routes.js";

const router = Router();

router.use("/organizaciones", organizacionRouter);

export default router;