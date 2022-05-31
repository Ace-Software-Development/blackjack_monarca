const express = require('express');
const router = express.Router();

const dashboardController = require('../controller/dashboard');

router.get('/ordenes/get', dashboardController.getAllOrdersController);

module.exports = router;