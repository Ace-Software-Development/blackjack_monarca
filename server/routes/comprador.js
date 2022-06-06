const express = require('express');
const router = express.Router();

const compradorController = require('../controller/comprador');

router.post('/post', compradorController.postBuyerController);
router.get('/get', compradorController.getAllBuyerController);
router.post('/modify', compradorController.modifyBuyerController);
router.post('/delete', compradorController.deleteBuyerController);


module.exports = router;