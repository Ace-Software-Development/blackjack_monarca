const express = require('express');
const router = express.Router();
const path = require('path');

const entradaDiscosController = require('../controller/visualizarEntradaDiscos');

/*router.post('/post', entradaDiscosController.postIncomingDiskController);*/
router.get('/get', entradaDiscosController.getDisksQuantityController);

module.exports = router;