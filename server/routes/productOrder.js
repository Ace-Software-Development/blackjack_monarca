// CU 51 52 53 24
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();
const path = require('path');

const productOrderController = require('../controller/productOrder');

router.post('/post', productOrderController.postProductOrderController);
router.post('/confirmar/post', productOrderController.confirmProductOrderController);
router.get('/get/:id', productOrderController.getProductOrderController);
router.post('/modify', productOrderController.modifyProductOrderController);
router.post('/delete', productOrderController.deleteProductOrderController);

module.exports = router;