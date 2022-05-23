const express = require('express');
const router = express.Router();

const buyerController = require('../controller/buyer');

router.get('/get', buyerController.getAllBuyersController);

module.exports = router;