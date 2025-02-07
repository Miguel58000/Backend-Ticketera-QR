import express from 'express';
import eventoController from '../controllers/evento.controller';

const router = express.Router();

router.post('/',eventoController.crearEvento)

export default router;