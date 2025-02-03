import express from 'express';
import organizacionController from '../controllers/organizacion.controller.js';

const router = express.Router();


router.post('/', organizacionController.crearOrganizacion);

export default router;