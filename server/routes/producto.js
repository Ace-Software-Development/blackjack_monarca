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