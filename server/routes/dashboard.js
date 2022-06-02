// CU 14 Consultar pedido

const express = require('express');
const router = express.Router();

const dashboardController = require('../controller/dashboard');

router.get('/ordenes/get', dashboardController.getAllOrdersController);
router.get('/ordenes/getOne/:id', dashboardController.getOrderController);

module.exports = router;