const express = require('express');
const router = express.Router();
const path = require('path');

const discosController = require('../controller/entradaDiscos');

router.post('/post', discosController.post);
router.get('/get', discosController.get);

module.exports = router;