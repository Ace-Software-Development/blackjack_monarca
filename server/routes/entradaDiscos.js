const express = require('express');
const router = express.Router();
const path = require('path');

const discosController = require('../controller/entradaDiscos');
const cors = require('cors');

router.post('/post', discosController.postIncomingDiskController);
router.get('/get', discosController.getAllDisksController);
router.post('/modificar', discosController.modifyIncomingDiskController);

module.exports = router;