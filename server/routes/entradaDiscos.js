const express = require('express');
const router = express.Router();
const path = require('path');

const discosController = require('../controller/entradaDiscos');

router.post('/post', discosController.postIncomingDiskController);
router.get('/get', discosController.getAllDisksController);

module.exports = router;