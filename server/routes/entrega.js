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

module.exports = router;