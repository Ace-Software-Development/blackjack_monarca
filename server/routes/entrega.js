const express = require('express');
const router = express.Router();

const entregaController = require('../controller/entrega');

router.get('/partes/get', entregaController.getAllPartsController);

module.exports = router;