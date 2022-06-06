const express = require('express');
const router = express.Router();

const productionController = require('../controller/production');

router.get('/:startDay/:endDay/:id_worker/get', productionController.getProductionWorkerDay);

module.exports = router;