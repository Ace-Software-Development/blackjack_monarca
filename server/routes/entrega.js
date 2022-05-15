const express = require('express');
const router = express.Router();

const entregaController = require('../controller/entrega');

router.get('/partes/get', entregaController.getAllPartsController);
router.get('/trabajadores/get', entregaController.getAllWorkersController);
router.get('/categorias/get', entregaController.getAllCategoriesController);

module.exports = router;