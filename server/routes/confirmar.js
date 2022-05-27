const express = require('express');
const router = express.Router();

const confirmarController = require('../controller/confirmar');

router.get('/get/:id_process', confirmarController.getConfirmarController);
router.get('/incident/get', confirmarController.getConfirmarIncidenteController);

module.exports = router;