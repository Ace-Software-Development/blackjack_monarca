const express = require('express');
const router = express.Router();
const path = require('path');

const productOrderController = require('../controller/productOrder');

router.post('/post', productOrderController.postProductOrderController);
router.get('/get/:id', productOrderController.getProductOrderController);
router.post('/modify', productOrderController.modifyProductOrderController);
router.post('/delete', productOrderController.deleteProductOrderController);

module.exports = router;