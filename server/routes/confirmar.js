const express = require('express');
const router = express.Router();

const confirmarController = require('../controller/confirmar');

router.get('/get', confirmarController.getConfirmarController);

module.exports = router;