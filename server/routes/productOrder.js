const express = require('express');
const router = express.Router();
const path = require('path');

const productOrderController = require('../controller/productOrder');

router.post('/post', productOrderController.postProductOrderController);

module.exports = router;