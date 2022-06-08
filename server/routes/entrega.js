// CU 4
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const entregaController = require('../controller/entrega');

router.get('/partes/get', entregaController.getAllPartsController);
router.get('/trabajadores/get/:process', entregaController.getAllWorkersController);
router.get('/trabajador/get/:id', entregaController.getWorkerByIdController);
router.get('/categorias/get', entregaController.getAllCategoriesController);
router.get('/categoria/get/:id', entregaController.getCategoryById);
router.get('/modelos/get/:categoryId', entregaController.getAllModelsController);
router.get('/modelo/get/:id', entregaController.getModelByIdController);
router.post('/post', entregaController.postPartController);
router.post('/incidente/post', entregaController.postIncidenteController);

module.exports = router;