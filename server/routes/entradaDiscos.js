const express = require('express');
const router = express.Router();
const path = require('path');

const discosController = require('../controller/entradaDiscos');

router.post('/add', discosController.add);

module.exports = router;