// CU 34 35 36 37 13
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const productoController = require('../controller/producto');

router.post('/postInventory', productoController.postProductInventoryController);
router.get('/get', productoController.getAllProductsController);
router.post('/modifyInventory', productoController.modifyProductInventoryController);
router.get('/getProductById/:id', productoController.getProductByIdController);
router.post('/post', productoController.postProductController);
router.post('/modify', productoController.modifyProductController);
router.post('/delete', productoController.deleteProductController);


module.exports = router;